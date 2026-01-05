export function initBackground() {
    const c = document.getElementById('menu-canvas');
    const x = c.getContext('2d');
    let w, h;

    function resize() {
        w = c.width = window.innerWidth;
        h = c.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    let t = 0; // Time variable
    
    // Stars generation
    const stars = [];
    for(let i=0; i<100; i++) {
        stars.push({ x: Math.random(), y: Math.random(), s: Math.random() * 2 });
    }

    function draw() {
        let g = x.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, "#050011");
        g.addColorStop(0.5, "#1a0029");
        g.addColorStop(1, "#3c0047");
        x.fillStyle = g;
        x.fillRect(0, 0, w, h);

        x.fillStyle = "#fff";
        stars.forEach(st => {
            x.globalAlpha = 0.5 + Math.sin(t * 2 + st.x * 10) * 0.4; // Twinkle
            x.beginPath();
            x.arc(st.x * w, st.y * (h * 0.6), st.s, 0, Math.PI*2); // Only in sky
            x.fill();
        });
        x.globalAlpha = 1;

        let hz = h * 0.55; 
        let sunSize = Math.min(w, h) * 0.2;
        let sunG = x.createLinearGradient(0, hz - sunSize, 0, hz + sunSize);
        sunG.addColorStop(0, "#ffdd00"); 
        sunG.addColorStop(0.5, "#ff0066"); 
        sunG.addColorStop(1, "#990099"); 

        x.save();
        x.shadowBlur = 40;
        x.shadowColor = "#ff0066";
        x.beginPath();
        x.arc(w/2, hz, sunSize, 0, Math.PI * 2);
        x.fillStyle = sunG;
        x.fill();
        x.shadowBlur = 0;
        x.restore();

        x.fillStyle = "#2c053a"; 
        for(let i = 0; i < sunSize; i += 3 + (i/15)) { 
            let y = hz + i;
            if(y > hz - sunSize/3) {
                 let barH = 2 + (i/15);
                 let barY = hz + i; 
                 x.fillRect(w/2 - sunSize, barY, sunSize*2, barH);
            }
        }

        x.save();
        x.beginPath();
        x.rect(0, hz, w, h-hz);
        x.clip(); 

        let groundG = x.createLinearGradient(0, hz, 0, h);
        groundG.addColorStop(0, "#190029");
        groundG.addColorStop(1, "#000");
        x.fillStyle = groundG;
        x.fillRect(0, hz, w, h-hz);

        x.strokeStyle = "rgba(255, 0, 255, 0.4)"; 
        x.lineWidth = 2;
        x.shadowBlur = 5;
        x.shadowColor = "#ff00ff";

        let fov = 300;
        for (let i = -w; i <= w; i += 60) {
            x.beginPath();
            x.moveTo(w/2, hz); 
            let xBottom = w/2 + (i * 5); 
            x.lineTo(xBottom, h);
            x.stroke();
        }

        for(let i=0; i<30; i++) {
            let p = (i + (t%1)) / 30;
            let y = hz + (p*p*p) * (h-hz);
            
            x.globalAlpha = p; 
            x.beginPath();
            x.moveTo(0, y);
            x.lineTo(w, y);
            x.stroke();
        }
        x.globalAlpha = 1;

        x.restore();
        
        let rad = x.createRadialGradient(w/2, h/2, h/3, w/2, h/2, h);
        rad.addColorStop(0, "transparent");
        rad.addColorStop(1, "rgba(0,0,0,0.8)");
        x.fillStyle = rad;
        x.fillRect(0,0,w,h);

        t += 0.01;
        requestAnimationFrame(draw);
    }
    draw();
}