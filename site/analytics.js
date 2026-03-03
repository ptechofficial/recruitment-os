/* ========================================
   RECRUITMENT OS — ANALYTICS ENGINE
   PostHog + Microsoft Clarity + Custom Events
   ======================================== */

(function () {
    'use strict';

    // ============================================================
    //  CONFIGURATION — Replace these with your actual IDs
    // ============================================================
    var POSTHOG_KEY = 'YOUR_POSTHOG_PROJECT_API_KEY';   // Get from: PostHog → Settings → Project API Key
    var POSTHOG_HOST = 'https://us.i.posthog.com';       // or https://eu.i.posthog.com for EU
    var CLARITY_ID = 'YOUR_CLARITY_PROJECT_ID';           // Get from: clarity.microsoft.com → Settings → Project ID

    var isConfigured = {
        posthog: POSTHOG_KEY !== 'YOUR_POSTHOG_PROJECT_API_KEY',
        clarity: CLARITY_ID !== 'YOUR_CLARITY_PROJECT_ID'
    };

    // ============================================================
    //  POSTHOG INIT
    // ============================================================
    if (isConfigured.posthog) {
        !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url lib get_property getSessionProperty sessionRecordingStarted loadToolbar get_config capture_pageview capture_pageleave createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

        posthog.init(POSTHOG_KEY, {
            api_host: POSTHOG_HOST,
            person_profiles: 'identified_only',
            capture_pageview: true,
            capture_pageleave: true,
            autocapture: true,
            session_recording: {
                maskAllInputs: false,
                maskInputOptions: { password: true }
            }
        });
    }

    // ============================================================
    //  MICROSOFT CLARITY INIT
    // ============================================================
    if (isConfigured.clarity) {
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", CLARITY_ID);
    }

    // ============================================================
    //  UNIFIED EVENT TRACKER
    // ============================================================
    function track(eventName, properties) {
        var props = properties || {};
        props.page = window.location.pathname;
        props.timestamp = new Date().toISOString();

        // PostHog
        if (isConfigured.posthog && window.posthog) {
            posthog.capture(eventName, props);
        }

        // Clarity custom tags
        if (isConfigured.clarity && window.clarity) {
            clarity('set', eventName, JSON.stringify(props));
        }
    }

    // Expose globally for inline use
    window.ROS_Analytics = { track: track };

    // ============================================================
    //  PAGE IDENTIFICATION
    // ============================================================
    var page = 'unknown';
    var path = window.location.pathname;
    if (path.includes('_sg-ops') || path.includes('gtm')) {
        page = 'gtm_plan';
    } else if (path.includes('dashboard')) {
        page = 'dashboard';
    } else {
        page = 'landing';
    }

    track('page_identified', { page_type: page });

    // ============================================================
    //  SCROLL DEPTH TRACKING
    // ============================================================
    var scrollMilestones = { 25: false, 50: false, 75: false, 100: false };

    function getScrollPercent() {
        var h = document.documentElement;
        var b = document.body;
        var scrollTop = h.scrollTop || b.scrollTop;
        var scrollHeight = (h.scrollHeight || b.scrollHeight) - h.clientHeight;
        if (scrollHeight === 0) return 0;
        return Math.round((scrollTop / scrollHeight) * 100);
    }

    var scrollTimer = null;
    window.addEventListener('scroll', function () {
        if (scrollTimer) return;
        scrollTimer = setTimeout(function () {
            scrollTimer = null;
            var pct = getScrollPercent();
            [25, 50, 75, 100].forEach(function (milestone) {
                if (pct >= milestone && !scrollMilestones[milestone]) {
                    scrollMilestones[milestone] = true;
                    track('scroll_depth', { percent: milestone, page_type: page });
                }
            });
        }, 300);
    }, { passive: true });

    // ============================================================
    //  TIME ON PAGE TRACKING
    // ============================================================
    var pageStartTime = Date.now();
    var timeIntervals = [30, 60, 120, 300]; // seconds
    var timeTracked = {};

    var timeInterval = setInterval(function () {
        var elapsed = Math.floor((Date.now() - pageStartTime) / 1000);
        timeIntervals.forEach(function (t) {
            if (elapsed >= t && !timeTracked[t]) {
                timeTracked[t] = true;
                track('time_on_page', { seconds: t, page_type: page });
            }
        });
        if (Object.keys(timeTracked).length >= timeIntervals.length) {
            clearInterval(timeInterval);
        }
    }, 5000);

    // ============================================================
    //  CTA CLICK TRACKING
    // ============================================================
    document.addEventListener('click', function (e) {
        var el = e.target.closest('a, button');
        if (!el) return;

        var text = (el.textContent || '').trim().substring(0, 60);
        var href = el.getAttribute('href') || '';
        var classes = el.className || '';

        // CTA buttons
        if (classes.includes('btn-primary') || classes.includes('btn-cta') || classes.includes('btn-header')) {
            track('cta_click', {
                button_text: text,
                href: href,
                location: getClickLocation(el),
                page_type: page
            });
        }

        // Navigation clicks
        if (classes.includes('nav-item') || classes.includes('nav-link') || el.closest('.nav-links')) {
            track('nav_click', {
                destination: text || href,
                page_type: page
            });
        }

        // Cal.com / booking links
        if (href.includes('cal.com') || href.includes('#apply') || text.toLowerCase().includes('qualify') || text.toLowerCase().includes('book')) {
            track('booking_intent', {
                button_text: text,
                href: href,
                page_type: page
            });
        }

        // External links
        if (href.startsWith('http') && !href.includes(window.location.hostname)) {
            track('outbound_click', {
                destination: href,
                text: text,
                page_type: page
            });
        }
    });

    function getClickLocation(el) {
        var section = el.closest('section, header, footer');
        if (!section) return 'unknown';
        return section.id || section.className.split(' ')[0] || 'unknown';
    }

    // ============================================================
    //  SECTION VISIBILITY TRACKING (Landing Page)
    // ============================================================
    if (page === 'landing' && 'IntersectionObserver' in window) {
        var sectionsSeen = {};
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.id || entry.target.className.split(' ').pop();
                    if (id && !sectionsSeen[id]) {
                        sectionsSeen[id] = true;
                        track('section_viewed', { section: id, page_type: page });
                    }
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('section[id]').forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    // ============================================================
    //  FAQ INTERACTION TRACKING (Landing Page)
    // ============================================================
    if (page === 'landing') {
        document.querySelectorAll('.faq-question').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var questionText = (this.textContent || '').trim().substring(0, 80);
                track('faq_opened', { question: questionText });
            });
        });
    }

    // ============================================================
    //  CAL.COM IFRAME ENGAGEMENT (Landing Page)
    // ============================================================
    if (page === 'landing') {
        var calTracked = false;
        var calWrapper = document.querySelector('.cal-wrapper');
        if (calWrapper && 'IntersectionObserver' in window) {
            var calObserver = new IntersectionObserver(function (entries) {
                if (entries[0].isIntersecting && !calTracked) {
                    calTracked = true;
                    track('cal_embed_visible', { page_type: page });
                    calObserver.disconnect();
                }
            }, { threshold: 0.5 });
            calObserver.observe(calWrapper);
        }
    }

    // ============================================================
    //  DASHBOARD EVENT TRACKING
    // ============================================================
    if (page === 'dashboard') {
        // Job search form submission
        var searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', function () {
                var title = (document.getElementById('jobTitle') || {}).value || '';
                var location = (document.getElementById('location') || {}).value || '';
                track('job_search_submitted', {
                    job_title: title.substring(0, 50),
                    location: location.substring(0, 50)
                });
            });
        }

        // Sheet toggle (Current Jobs / All Jobs)
        document.querySelectorAll('[data-sheet]').forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                track('sheet_toggled', { sheet: this.getAttribute('data-sheet') || this.textContent.trim() });
            });
        });

        // Refresh button
        var refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function () {
                track('data_refreshed', { page_type: 'dashboard' });
            });
        }

        // Tab switching (Dashboard / Hiring Signals / GTM)
        document.querySelectorAll('.nav-item').forEach(function (item) {
            item.addEventListener('click', function () {
                track('tab_switched', { tab: (this.textContent || '').trim() });
            });
        });
    }

    // ============================================================
    //  GTM PLAN TRACKING
    // ============================================================
    if (page === 'gtm_plan') {
        track('gtm_plan_viewed', { referrer: document.referrer });
    }

    // ============================================================
    //  EXIT INTENT TRACKING (Landing Page)
    // ============================================================
    if (page === 'landing') {
        var exitTracked = false;
        document.addEventListener('mouseout', function (e) {
            if (e.clientY < 5 && !exitTracked) {
                exitTracked = true;
                track('exit_intent', {
                    scroll_depth: getScrollPercent(),
                    time_on_page: Math.floor((Date.now() - pageStartTime) / 1000)
                });
            }
        });
    }

    // ============================================================
    //  DEVICE & SESSION CONTEXT (fires once)
    // ============================================================
    track('session_start', {
        page_type: page,
        screen_width: window.innerWidth,
        screen_height: window.innerHeight,
        device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
        referrer: document.referrer || 'direct',
        utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || ''
    });

})();
