/**
 * Orchard Commons System
 * 
 * Manages Layer 2 Commons cooperative features:
 * 1. Circle Registration (Clans/Guilds)
 * 2. Peer Seed Gifting Ledger (Local-first P2P simulation)
 */

export const Commons = {
  // Join or register in an Aporaksha Circle
  joinCircle(circleName) {
    if (!circleName || circleName.trim() === '') return { success: false, error: 'Empty circle name' };

    const uid = localStorage.getItem('ecosystem_uid') || 'guest';
    const cleanName = circleName.trim();
    
    localStorage.setItem(`via_user_${uid}_circle`, cleanName);
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('engine:circle_joined', { detail: { uid, circleName: cleanName } }));
    
    return { success: true, circleName: cleanName };
  },

  // Get active circle name
  getCircle() {
    const uid = localStorage.getItem('ecosystem_uid') || 'guest';
    return localStorage.getItem(`via_user_${uid}_circle`) || null;
  },

  // Send a gift packet of seeds to a peer UID
  giftSeeds(recipientUid, seedType) {
    if (!recipientUid || recipientUid.trim() === '') {
      return { success: false, error: 'Recipient UID is required' };
    }

    const senderUid = localStorage.getItem('ecosystem_uid') || 'guest';
    if (senderUid === recipientUid) {
      return { success: false, error: 'Cannot gift seeds to yourself!' };
    }

    // Gifting seeds costs a small transaction fee of 15 credits
    const creditsKey = `via_user_${senderUid}_credits`;
    const currentCredits = Number(localStorage.getItem(creditsKey) || 0);

    if (currentCredits < 15) {
      return { success: false, error: 'Insufficient credits! Gifting costs 15 credits.' };
    }

    // Deduct transaction fee
    const nextCredits = currentCredits - 15;
    localStorage.setItem(creditsKey, String(nextCredits));
    if (window.OrchardRuntime) {
      window.OrchardRuntime.credits = nextCredits;
    }

    // Write to local-first shared gift ledger
    const ledgerRaw = localStorage.getItem('via_gift_ledger') || '[]';
    let ledger = [];
    try {
      ledger = JSON.parse(ledgerRaw);
    } catch {
      ledger = [];
    }

    const newGift = {
      id: Math.random().toString(36).slice(2, 9),
      from: senderUid,
      to: recipientUid.trim(),
      seed: seedType,
      timestamp: Date.now(),
      claimed: false
    };

    ledger.push(newGift);
    localStorage.setItem('via_gift_ledger', JSON.stringify(ledger));

    // Dispatch event
    window.dispatchEvent(new CustomEvent('engine:seed_forged', { detail: newGift }));

    return { success: true, nextCredits };
  },

  // Check and claim any pending gifts addressed to the active user
  checkPendingGifts() {
    const uid = localStorage.getItem('ecosystem_uid') || 'guest';
    if (uid === 'guest') return [];

    const ledgerRaw = localStorage.getItem('via_gift_ledger') || '[]';
    let ledger = [];
    try {
      ledger = JSON.parse(ledgerRaw);
    } catch {
      return [];
    }

    // Find unclaimed gifts for this user
    const myGifts = ledger.filter(gift => gift.to === uid && !gift.claimed);
    if (myGifts.length === 0) return [];

    // Mark as claimed in the master ledger
    ledger.forEach(gift => {
      if (gift.to === uid) gift.claimed = true;
    });
    localStorage.setItem('via_gift_ledger', JSON.stringify(ledger));

    // Apply gifts to active inventory/licenses
    let wheatAdded = 0;
    let cornAdded = 0;
    let berryAdded = 0;

    myGifts.forEach(gift => {
      if (gift.seed === 'corn') {
        cornAdded = 1;
      } else if (gift.seed === 'berry') {
        berryAdded = 1;
      } else {
        wheatAdded += 5; // wheat gifts give raw seed packs
      }
    });

    // Save back to active runtime inventory if defined
    if (window.OrchardRuntime) {
      if (cornAdded) window.OrchardRuntime.inventory.corn = 1;
      if (berryAdded) window.OrchardRuntime.inventory.berry = 1;
      // Also save
      const saveKey = `via_user_${uid}_save`;
      const rawSave = localStorage.getItem(saveKey);
      if (rawSave) {
        try {
          const parsed = JSON.parse(rawSave);
          parsed.inventory = parsed.inventory || { wheat: 1, corn: 0, berry: 0, fertilizer: 0 };
          if (cornAdded) parsed.inventory.corn = 1;
          if (berryAdded) parsed.inventory.berry = 1;
          localStorage.setItem(saveKey, JSON.stringify(parsed));
        } catch {}
      }
    }

    return myGifts;
  }
};
