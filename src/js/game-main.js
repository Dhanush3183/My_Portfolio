
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const WORLD = {
  width: 9000,
  height: 9000
};

const ship = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  angle: 0
};

const camera = {
  x: 0,
  y: 0
};

const keys = {};
const stars = [];
const asteroids = [];
const planets = [];
let currentPlanet = null;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function initStars() {
  stars.length = 0;
  for (let i = 0; i < 1400; i++) {
    stars.push({
      x: rand(-WORLD.width / 2, WORLD.width / 2),
      y: rand(-WORLD.height / 2, WORLD.height / 2),
      r: rand(0.5, 2.2),
      a: rand(0.25, 1),
      tw: rand(0.003, 0.02)
    });
  }
}

function initAsteroids() {
  asteroids.length = 0;
  for (let i = 0; i < 70; i++) {
    asteroids.push({
      x: rand(-WORLD.width / 2, WORLD.width / 2),
      y: rand(-WORLD.height / 2, WORLD.height / 2),
      r: rand(10, 28),
      rot: rand(0, Math.PI * 2),
      rs: rand(-0.02, 0.02),
      vx: rand(-0.35, 0.35),
      vy: rand(-0.35, 0.35)
    });
  }
}

function initPlanets() {
  planets.length = 0;
  
  // Array structure: ['Name', 'Category', 'Color', Size, X, Y, 'Custom HTML Content']
  const data = [
    [
      'Home', 'Intro', '#00d4ff', 90, 0, 0,
      `<br><br>
      <h3>Welcome to my Universe</h3>
      <br>
       <p>I have strong foundation in programming languages such as Java and Python.</p>
       <p>Skilled in web development, debugging, code review, and version control systems, with focus on delivering high quality code.</p>
       <p>Hardworking, highly motivated professional eager to lend combined knowledge and skills to enhance business performance.</p>
       <p>Operates well in both individual and team capacities, leveraging work ethic to quickly adapt to different processes and drive company objectives.</p>`
    ],
    [
      'Skills', 'Skills', '#ff006e', 100, 2600, -2000,
      `<br><br>
      <h2>My Hard Skills</h2>
       <br>
       <ul>
         <li>Web Development</li>
         <li>Python, Java</li>
         <li>HTML, CSS, JavaScript</li>
         <li>MySQL, PostgreSQL, MongoDB</li>
         <li>Git and GitHub</li>
         <li>Data Visualization Tools</li>
         <li>Spring Boot</li>
         <li>React</li>
         <li>Node JS</li>
       </ul>
       <br><br>
       <h2>My Soft Skills</h2>
       <br>
       <ul>
         <li>Hard working</li>
         <li>Teamwork and collaboration</li>
         <li>Time management</li>
         <li>Problem solving</li>
         <li>Critical Thinking</li>
         <li>Multitasking</li>
         <li>Friendly, positive attitude</li>
       </ul>
       `
    ],
    [
      'Projects', 'Projects', '#ffb703', 100, -1800, 2200,
      `<br><br>
      <h3>Online Game Zone</h3>
       <br>
       <ul>
           <li>A full-stack web platform offering interactive browser based games with responsive UI and seamless user experience.</li>
           <li>Built using HTML, CSS, and JavaScript for dynamic UI, responsive layouts, and interactive game logic.</li>
           <button style="background-color: #04AA6D; color: white; padding: 12px 24px; border: 3px solid black; border-radius: 10px; font-size: 16px; cursor: pointer;" onclick="window.location.href='https://dhanush3183.github.io/Game-Zone/HomePage.html'">Live Link</button>
       </ul>
       <br><br>
       <h3>Smart Restaurant Management System</h3>
       <br>
       <ul>
           <li>Designed and implemented a full-stack web platform to streamline operations, optimize inventory and enhance Owner + Staff experience.</li>
           <li>Built using Spring Boot (Backend), React (Frontend) and MySQL (Database) for a robust full-stack web development solution.</li>
       </ul>
       `
    ],
    [
      'Hobbies', 'Hobbies', '#9b5de5', 95, 1200, 2300,
      `<br><br>
      <h2>My Hobbies</h2>
      <br>
      <ul>
       <li>Coding</li>
       <li>Building personal projects</li>
       <li>Puzzle solving</li>
       <li> Learning about emerging tech in AI</li>
       </ul>
       `
    ],
    [
      'Education', 'Education', '#06d6a0', 85, -1400, -2800,
      `<br><br>
      <h2>Bachelor Of Technology in Computer Science</h3>
       <h3>CGPA : 9.57</h3>
       <p>Koneru Lakshmaiah Education Foundation, Hyderabad</p>
       <p>Expected Graduation : May 2028</p>
       <br><br>
       `
    ],
    [
      'Contact', 'Contact', '#ef476f', 80, 2400, 400,
      `<br><br>
      <h2>Let's Connect</h2>
      <br>
       <p>Gmail : dhanushpaidi9@gmail.com</p>
       <p>Phone No. : +91 9866548204</p>
       <p>LinkedIn: <a href="https://www.linkedin.com/in/dhanush-paidi-a587a6366/" style="color:#00d4ff;">/in/dhanushpaidi</a></p>
       <p>Location : Hyderabad, Telangana 500018</p>
       <p>DOB : 03/09/2006</p>
       <p>Nationality : Indian</p>
       `
    ],
    [
      'Achievements', 'Certifications', '#f15bb5', 70, -3200, -200,
      `<br><br>
      <h3>My Certifications</h3>
      <br>
      <ul>
       <li>Microsoft Certified: Azure AI Fundamentals (AI-900), Microsoft, 2026</li>
       <li>AWS Certified Cloud Practitioner, Amazon Web Services, 2026</li>
       <li>Getting Started with Git and GitHub Certification, authorized by IBM and offered through Coursera, 2025</li>
       <li>Attended workshop on “Front-End Web Development” organized by BITSPilani Hyderabad Institute, November 2024</li>
       </ul>
       `
    ]
  ];

  // Map the new htmlContent parameter to the planet object
  data.forEach(([name, category, color, size, x, y, htmlContent]) => {
    planets.push({
      name,
      category,
      color,
      size,
      x,
      y,
      htmlContent, // Store the custom HTML here
      visited: false
    });
  });
}

initStars();
initAsteroids();
initPlanets();

const shipImg = null;

document.addEventListener('keydown', e => {
  keys[e.code] = true;
  if (e.code === 'Space') e.preventDefault();
  if (e.code === 'KeyM') toggleMap();
});

document.addEventListener('keyup', e => {
  keys[e.code] = false;
});

function updateShip() {
  const accel = 0.35;
  const friction = 0.985;
  const maxSpeed = keys.Space ? 14 : 8;

  if (keys.ArrowUp) ship.vy -= accel;
  if (keys.ArrowDown) ship.vy += accel;
  if (keys.ArrowLeft) ship.vx -= accel;
  if (keys.ArrowRight) ship.vx += accel;

  ship.vx *= friction;
  ship.vy *= friction;

  const speed = Math.hypot(ship.vx, ship.vy);
  if (speed > maxSpeed) {
    ship.vx = (ship.vx / speed) * maxSpeed;
    ship.vy = (ship.vy / speed) * maxSpeed;
  }

  ship.x += ship.vx;
  ship.y += ship.vy;

  ship.x = Math.max(-WORLD.width / 2, Math.min(WORLD.width / 2, ship.x));
  ship.y = Math.max(-WORLD.height / 2, Math.min(WORLD.height / 2, ship.y));

  if (Math.abs(ship.vx) > 0.01 || Math.abs(ship.vy) > 0.01) {
    ship.angle = Math.atan2(ship.vy, ship.vx);
  }
}

function updateCamera() {
  camera.x += (ship.x - camera.x) * 0.08;
  camera.y += (ship.y - camera.y) * 0.08;
}

function worldToScreen(x, y) {
  return {
    x: x - camera.x + canvas.width / 2,
    y: y - camera.y + canvas.height / 2
  };
}

function drawBackground() {
  const g = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 0,
    canvas.width / 2, canvas.height / 2,
    Math.max(canvas.width, canvas.height)
  );
  g.addColorStop(0, '#1b2735');
  g.addColorStop(1, '#090a0f');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawStars() {
  for (const s of stars) {
    s.a += (Math.random() - 0.5) * s.tw;
    if (s.a < 0.2) s.a = 0.2;
    if (s.a > 1) s.a = 1;
    const p = worldToScreen(s.x, s.y);
    if (p.x < -10 || p.x > canvas.width + 10 || p.y < -10 || p.y > canvas.height + 10) continue;
    ctx.beginPath();
    ctx.arc(p.x, p.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.a})`;
    ctx.fill();
  }
}

function drawAsteroids() {
  for (const a of asteroids) {
    a.x += a.vx;
    a.y += a.vy;
    a.rot += a.rs;
    if (a.x > WORLD.width / 2) a.x = -WORLD.width / 2;
    if (a.x < -WORLD.width / 2) a.x = WORLD.width / 2;
    if (a.y > WORLD.height / 2) a.y = -WORLD.height / 2;
    if (a.y < -WORLD.height / 2) a.y = WORLD.height / 2;

    const p = worldToScreen(a.x, a.y);
    if (p.x < -60 || p.x > canvas.width + 60 || p.y < -60 || p.y > canvas.height + 60) continue;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(a.rot);
    ctx.beginPath();
    for (let i = 0; i < 7; i++) {
      const ang = (i / 7) * Math.PI * 2;
      const rr = a.r * (0.8 + Math.random() * 0.3);
      const x = Math.cos(ang) * rr;
      const y = Math.sin(ang) * rr;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = '#8d8d8d';
    ctx.fill();
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }
}

function drawPlanets() {
  for (const pl of planets) {
    const p = worldToScreen(pl.x, pl.y);
    if (p.x < -pl.size * 3 || p.x > canvas.width + pl.size * 3 || p.y < -pl.size * 3 || p.y > canvas.height + pl.size * 3) continue;

    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pl.size * 3);
    glow.addColorStop(0, `${pl.color}cc`);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(p.x, p.y, pl.size * 3, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    const body = ctx.createRadialGradient(p.x - pl.size * 0.35, p.y - pl.size * 0.35, 0, p.x, p.y, pl.size);
    body.addColorStop(0, pl.color);
    body.addColorStop(1, '#111');
    ctx.beginPath();
    ctx.arc(p.x, p.y, pl.size, 0, Math.PI * 2);
    ctx.fillStyle = body;
    ctx.fill();

    if (pl.size >= 95) {
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, pl.size * 1.5, pl.size * 0.45, Math.PI / 4, 0, Math.PI * 2);
      ctx.strokeStyle = `${pl.color}88`;
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    ctx.fillStyle = '#fff';
    ctx.font = `bold ${Math.max(14, pl.size / 4)}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(pl.name, p.x, p.y - pl.size - 18);
    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = '#b9c4d0';
    ctx.fillText(pl.category, p.x, p.y + pl.size + 16);
  }
}

function drawShip() {
  const p = worldToScreen(ship.x, ship.y);
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(ship.angle);

  ctx.shadowColor = '#00d4ff';
  ctx.shadowBlur = 28;
  ctx.beginPath();
  ctx.moveTo(24, 0);
  ctx.lineTo(-14, 12);
  ctx.lineTo(-8, 0);
  ctx.lineTo(-14, -12);
  ctx.closePath();
  ctx.fillStyle = '#00d4ff';
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.arc(-6, 0, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  if (keys.Space) {
    ctx.beginPath();
    ctx.moveTo(-16, 0);
    ctx.lineTo(-32 - Math.random() * 6, -5 - Math.random() * 2);
    ctx.lineTo(-32 - Math.random() * 6, 5 + Math.random() * 2);
    ctx.closePath();
    ctx.fillStyle = '#ffb703';
    ctx.fill();
  }

  ctx.restore();
}

function drawHUD() {
  const x = 18;
  const y = canvas.height - 82;
  ctx.fillStyle = 'rgba(0,0,0,0.72)';
  ctx.fillRect(x, y, 300, 62);
  ctx.strokeStyle = 'rgba(0,212,255,0.25)';
  ctx.strokeRect(x, y, 300, 62);

  ctx.fillStyle = '#00d4ff';
  ctx.font = 'bold 15px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('📍 Coordinates', x + 14, y + 23);

  ctx.fillStyle = '#ffffff';
  ctx.font = '13px Inter, sans-serif';
  ctx.fillText(`X: ${Math.round(ship.x)}   Y: ${Math.round(ship.y)}`, x + 14, y + 42);

  // --- NEW KM/H SPEED CALCULATION ---
    // 1. Get the raw physics speed
    const rawSpeed = Math.hypot(ship.vx, ship.vy);
    
    // 2. Scale it (max speed of 14 becomes 1000 km/h)
    const displaySpeed = Math.round((rawSpeed / 14) * 1000);

    // 3. Render the new speed string
    ctx.fillStyle = '#ff006e';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText(`⚡ Speed: ${displaySpeed} km/h`, x + 160, y + 42);
}

function checkPlanetHover() {
  currentPlanet = null;
  for (const pl of planets) {
    const dx = ship.x - pl.x;
    const dy = ship.y - pl.y;
    const d = Math.hypot(dx, dy);
    if (d < pl.size + 24) {
      currentPlanet = pl;
      break;
    }
  }
}

function drawMap() {
  const minimap = document.getElementById('minimapCanvas');
  if (!minimap) return;
  const m = minimap.getContext('2d');
  const w = minimap.width = 200;
  const h = minimap.height = 200;
  m.clearRect(0, 0, w, h);
  m.fillStyle = 'rgba(0,0,0,0.85)';
  m.fillRect(0, 0, w, h);

  const scaleX = w / WORLD.width;
  const scaleY = h / WORLD.height;

  for (const pl of planets) {
    const px = (pl.x + WORLD.width / 2) * scaleX;
    const py = (pl.y + WORLD.height / 2) * scaleY;
    m.beginPath();
    m.arc(px, py, Math.max(2.5, pl.size * 0.09), 0, Math.PI * 2);
    m.fillStyle = pl.color;
    m.fill();
  }

  const sx = (ship.x + WORLD.width / 2) * scaleX;
  const sy = (ship.y + WORLD.height / 2) * scaleY;
  m.beginPath();
  m.arc(sx, sy, 4, 0, Math.PI * 2);
  m.fillStyle = '#00d4ff';
  m.fill();
  m.beginPath();
  m.arc(sx, sy, 7, 0, Math.PI * 2);
  m.strokeStyle = 'rgba(0,212,255,0.35)';
  m.lineWidth = 2;
  m.stroke();
}

function drawFullMap() {
  const full = document.getElementById('fullMapCanvas');
  if (!full) return;
  const f = full.getContext('2d');
  const w = full.width = 800;
  const h = full.height = 800;
  f.clearRect(0, 0, w, h);
  f.fillStyle = '#09111b';
  f.fillRect(0, 0, w, h);
  f.strokeStyle = '#00d4ff';
  f.lineWidth = 2;
  f.strokeRect(40, 40, 720, 720);

  const scaleX = 720 / WORLD.width;
  const scaleY = 720 / WORLD.height;

  for (const pl of planets) {
    const px = 40 + (pl.x + WORLD.width / 2) * scaleX;
    const py = 40 + (pl.y + WORLD.height / 2) * scaleY;
    f.beginPath();
    f.arc(px, py, Math.max(5, pl.size * 0.08), 0, Math.PI * 2);
    f.fillStyle = pl.color;
    f.fill();

    f.fillStyle = '#fff';
    f.font = '12px Inter, sans-serif';
    f.textAlign = 'center';
    f.fillText(pl.name, px, py - 12);
  }

  const sx = 40 + (ship.x + WORLD.width / 2) * scaleX;
  const sy = 40 + (ship.y + WORLD.height / 2) * scaleY;
  f.beginPath();
  f.arc(sx, sy, 6, 0, Math.PI * 2);
  f.fillStyle = '#00d4ff';
  f.fill();
  f.fillStyle = '#00d4ff';
  f.font = 'bold 14px Inter, sans-serif';
  f.fillText('YOU', sx, sy - 14);

  const viewW = canvas.width * scaleX;
  const viewH = canvas.height * scaleY;
  const viewX = 40 + camera.x * scaleX;
  const viewY = 40 + camera.y * scaleY;
  f.strokeStyle = 'rgba(255,255,255,0.5)';
  f.strokeRect(viewX, viewY, viewW, viewH);
}

function toggleMap() {
  const modal = document.getElementById('fullMapModal');
  if (!modal) return;
  if (modal.classList.contains('active')) modal.classList.remove('active');
  else {
    drawFullMap();
    modal.classList.add('active');
  }
}

function openPlanetModal() {
  if (!currentPlanet) return;
  
  document.getElementById('planetName').textContent = currentPlanet.name;
  document.getElementById('planetCategory').textContent = currentPlanet.category;
  
  // Inject the custom HTML defined in initPlanets()
  document.getElementById('planetContent').innerHTML = currentPlanet.htmlContent;
  
  document.getElementById('planetModal').classList.add('active');
}

document.getElementById('closePlanet').addEventListener('click', () => {
  document.getElementById('planetModal').classList.remove('active');
});
document.getElementById('visitMore').addEventListener('click', () => {
  document.getElementById('planetModal').classList.remove('active');
});
document.getElementById('closeMap').addEventListener('click', () => {
  document.getElementById('fullMapModal').classList.remove('active');
});
document.getElementById('minimap')?.addEventListener('click', toggleMap);
canvas.addEventListener('click', () => {
  if (currentPlanet) openPlanetModal();
});

function loop() {
  updateShip();
  updateCamera();
  checkPlanetHover();
  drawBackground();
  drawStars();
  drawAsteroids();
  drawPlanets();
  drawShip();
  drawHUD();
  drawMap();
  requestAnimationFrame(loop);
}

ship.x = 0;
ship.y = 0;
updateCamera();
loop();