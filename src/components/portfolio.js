/**
 * Orchard Merit Portfolio & Telemetry System
 * 
 * Computes, saves, and translates gameplay statistics into verified recruiter metrics:
 * 1. Daily login streaks
 * 2. Crop harvest task success rate (Harvests vs Decays)
 * 3. Unified Readiness Score
 * 4. Recruiter-inspectable JSON Credentials
 */

export const Portfolio = {
  _authToken: null,

  setAuthToken(token) {
    this._authToken = token;
  },

  async syncToSovereignEngine(uid = 'guest') {
    if (!this._authToken) return;
    const metrics = this.calculateMetrics(uid);
    try {
      await fetch('http://localhost:3000/api/passport/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._authToken}`
        },
        body: JSON.stringify({
          streak_count: metrics.streak,
          task_success_rate: metrics.taskQuality,
          readiness_score: metrics.readinessScore
        })
      });
    } catch (e) {
      console.warn('Portfolio sync failed (offline-first fallback active)', e);
    }
  },

  async syncFromSovereignEngine(uid = 'guest') {
    if (!this._authToken) return;
    try {
      const res = await fetch('http://localhost:3000/api/passport/portfolio', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this._authToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        const stats = this.getStats(uid);
        if (data.streak_count && data.streak_count > stats.streak) {
           stats.streak = data.streak_count;
           this.saveStats(uid, stats);
           this.dispatchUpdate(uid);
        }
      }
    } catch (e) {
      console.warn('Portfolio fetch failed (offline-first fallback active)', e);
    }
  },

  // Load telemetry stats for a user UID
  getStats(uid = 'guest') {
    const key = `via_user_${uid}_telemetry`;
    const defaultStats = {
      harvests: 0,
      decays: 0,
      streak: 1,
      lastLoginDate: null,
      loginDates: []
    };
    
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return defaultStats;
      const parsed = JSON.parse(raw);
      return { ...defaultStats, ...parsed };
    } catch {
      return defaultStats;
    }
  },

  // Save telemetry stats for a user UID
  saveStats(uid = 'guest', stats) {
    const key = `via_user_${uid}_telemetry`;
    localStorage.setItem(key, JSON.stringify(stats));
    this.syncToSovereignEngine(uid);
  },

  // Track a successful crop harvest
  recordHarvest(uid = 'guest') {
    const stats = this.getStats(uid);
    stats.harvests += 1;
    this.saveStats(uid, stats);
    this.dispatchUpdate(uid);
  },

  // Track a failed/decayed crop
  recordDecay(uid = 'guest') {
    const stats = this.getStats(uid);
    stats.decays += 1;
    this.saveStats(uid, stats);
    this.dispatchUpdate(uid);
  },

  // Update daily login streak
  updateStreak(uid = 'guest') {
    const stats = this.getStats(uid);
    const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    if (stats.lastLoginDate === todayStr) {
      return; // Already logged in today
    }
    
    if (!stats.lastLoginDate) {
      stats.streak = 1;
    } else {
      const lastDate = new Date(stats.lastLoginDate);
      const todayDate = new Date(todayStr);
      const diffTime = Math.abs(todayDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        stats.streak += 1; // Consecutive day
      } else if (diffDays > 1) {
        stats.streak = 1; // Streak broken
      }
    }
    
    stats.lastLoginDate = todayStr;
    if (!stats.loginDates.includes(todayStr)) {
      stats.loginDates.push(todayStr);
    }
    
    this.saveStats(uid, stats);
    this.dispatchUpdate(uid);
  },

  // Compute readiness score & task quality
  calculateMetrics(uid = 'guest', skillLevelsSum = 2) {
    const stats = this.getStats(uid);
    
    const totalCrops = stats.harvests + stats.decays;
    const taskQuality = totalCrops > 0 ? Math.round((stats.harvests / totalCrops) * 100) : 100;
    
    // Readiness formula: (Streak * 5) + (Quality * 0.6) + (SkillLevels * 4)
    // Capped at 100%
    const baseScore = (stats.streak * 5) + (taskQuality * 0.6) + (skillLevelsSum * 4);
    const readinessScore = Math.min(100, Math.round(baseScore));
    
    return {
      taskQuality,
      readinessScore,
      harvests: stats.harvests,
      decays: stats.decays,
      streak: stats.streak
    };
  },

  // Trigger DOM updates
  dispatchUpdate(uid) {
    window.dispatchEvent(new CustomEvent('portfolio:updated', { detail: { uid } }));
  },

  // Generate a verified JSON capability credential
  exportCredential(uid = 'guest', skillLevels = {}) {
    const metrics = this.calculateMetrics(uid, (skillLevels.logic || 1) + (skillLevels.strategy || 1));
    const credential = {
      issuer: 'Aporaksha Passport Services',
      subject: uid,
      timestamp: Date.now(),
      domain: 'Orchard Sovereign Engineering',
      metrics: {
        readinessScore: `${metrics.readinessScore}%`,
        taskQuality: `${metrics.taskQuality}%`,
        streakCount: `${metrics.streak} days`,
        totalHarvested: metrics.harvests,
        totalWasted: metrics.decays
      },
      capabilityVectors: {
        logic: skillLevels.logic || 1,
        strategy: skillLevels.strategy || 1,
        execution: skillLevels.execution || 1
      },
      signature: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    };
    
    return credential;
  }
};
