/* PARTICLES */
      (function () {
        const c = document.getElementById("bg-canvas"),
          ctx = c.getContext("2d");
        let W, H;
        function resize() {
          W = c.width = window.innerWidth;
          H = c.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);
        const pts = [];
        for (let i = 0; i < 90; i++)
          pts.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 1.4 + 0.4,
            a: Math.random() * 0.5 + 0.15,
          });
        function draw() {
          ctx.clearRect(0, 0, W, H);
          for (let i = 0; i < pts.length; i++)
            for (let j = i + 1; j < pts.length; j++) {
              const dx = pts[i].x - pts[j].x,
                dy = pts[i].y - pts[j].y,
                d = Math.sqrt(dx * dx + dy * dy);
              if (d < 130) {
                ctx.beginPath();
                ctx.moveTo(pts[i].x, pts[i].y);
                ctx.lineTo(pts[j].x, pts[j].y);
                ctx.strokeStyle = `rgba(232,255,71,${(1 - d / 130) * 0.1})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          pts.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(232,255,71,${p.a})`;
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
          });
          requestAnimationFrame(draw);
        }
        draw();
      })();

      /* SCROLL REVEAL */
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e, i) => {
            if (e.isIntersecting) {
              e.target.style.transitionDelay = (i % 4) * 0.1 + "s";
              e.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.1 },
      );
      document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

      /* COUNT UP */
      function countUp(el, target, dur = 1400) {
        let start = null;
        function step(ts) {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          el.textContent = Math.floor(p * target);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
      }
      const sObs = new IntersectionObserver(
        (e) => {
          e.forEach((x) => {
            if (x.isIntersecting) {
              document
                .querySelectorAll("[data-count]")
                .forEach((el) => countUp(el, +el.dataset.count));
              sObs.disconnect();
            }
          });
        },
        { threshold: 0.4 },
      );
      const sEl = document.querySelector(".hero-stats");
      if (sEl) sObs.observe(sEl);

      /* ACTIVE NAV */
      const secs = document.querySelectorAll("section[id]"),
        navAs = document.querySelectorAll(".nav-links a");
      window.addEventListener(
        "scroll",
        () => {
          let cur = "";
          secs.forEach((s) => {
            if (window.scrollY >= s.offsetTop - 180) cur = s.id;
          });
          navAs.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === "#" + cur);
          });
        },
        { passive: true },
      );

      /* PARALLAX */
      window.addEventListener(
        "scroll",
        () => {
          const el = document.querySelector(".hero-photo-wrap");
          if (el) el.style.transform = `translateY(${window.scrollY * 0.07}px)`;
        },
        { passive: true },
      );