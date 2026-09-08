import { useState, useEffect, useRef } from "react";

/* ---------- same content as Portfolio.jsx ---------- */
const I18N = {
  navAbout: { th: "เกี่ยวกับฉัน", en: "About" },
  navSkills: { th: "ทักษะ", en: "Skills" },
  navWork: { th: "โปรเจกต์", en: "Work" },
  navContact: { th: "ติดต่อ", en: "Contact" },
  brandName: { th: "นิชา", en: "Nicha" },
  name: { th: "นิชา วันวอน", en: "Nicha Wanwon" },
  nickname: { th: "(หยก)", en: "(Yok)" },
  status: { th: "กำลังมองหาที่ฝึกงาน", en: "Looking for an internship" },
  role: {
    th: "นักศึกษาปี 4 คณะเทคโนโลยีสารสนเทศ ม.ศรีปทุม||สร้างเว็บแอปตั้งแต่ front-end ถึง database — 6 โปรเจกต์ตลอด 4 ปี",
    en: "4th-year Information Technology student, Sripatum University||Building web apps from front-end to database — 6 projects across 4 years",
  },
  intro: {
    th: "มีพื้นฐานทั้ง front-end, back-end และฐานข้อมูล จากการพัฒนาโปรเจกต์ทั้งแบบเดี่ยวและแบบทีม พร้อมเรียนรู้เทคโนโลยีใหม่ ๆ อย่างต่อเนื่อง และอยากนำความรู้จากห้องเรียนไปใช้งานจริง",
    en: "Solid foundation in front-end, back-end, and databases through both solo and team projects. Always learning new technologies and eager to apply classroom knowledge to real-world work.",
  },
  ctaView: { th: "ดูโปรเจกต์ทั้งหมด", en: "View all projects" },
  ctaContact: { th: "ติดต่อฉัน", en: "Contact me" },
  aboutH2: { th: "เกี่ยวกับฉัน", en: "About Me" },
  aboutP1: {
    th: "เริ่มสนใจการพัฒนาเว็บไซต์ตั้งแต่ปี 1 และค่อย ๆ ขยับจากโปรเจกต์ front-end ล้วนไปสู่ระบบที่มีทั้ง backend และฐานข้อมูลของตัวเอง",
    en: "Got interested in web development since freshman year, gradually moving from pure front-end projects to systems with their own backend and database.",
  },
  aboutP2: {
    th: "ผ่านการฝึกงานด้านธุรการที่ต้องตรวจสอบความถูกต้องของข้อมูลอย่างละเอียด ซึ่งเป็นทักษะที่ติดตัวมาใช้กับงานเขียนโค้ดด้วยเช่นกัน",
    en: "Also worked as an administrative intern verifying data accuracy in detail — a habit of precision that carries over into writing code.",
  },
  factEduK: { th: "การศึกษา", en: "Education" },
  factEduV: { th: "วิทยาการคอมพิวเตอร์ฯ ม.ศรีปทุม (2565–2569)", en: "Computer Science, Sripatum University (2022–2026)" },
  factPriorK: { th: "พื้นฐานเดิม", en: "Prior background" },
  factPriorV: { th: "ปวช. คอมพิวเตอร์ธุรกิจ GPA 3.44", en: "Vocational Cert., Business Computing, GPA 3.44" },
  factTrackK: { th: "สายที่สนใจ", en: "Interested track" },
  skillsH2: { th: "ทักษะ", en: "Skills" },
  workH2: { th: "โปรเจกต์", en: "Projects" },
  workTag: { th: "5 builds · ปี1–ปี3", en: "5 builds · Y1–Y3" },
  expH2: { th: "ประสบการณ์", en: "Experience" },
  expYr: { th: "2565", en: "2022" },
  expTitle: { th: "เจ้าหน้าที่ธุรการ ฝ่ายงานอำนวยการ", en: "Administrative Officer, General Affairs Division" },
  expOrg: { th: "สถานีตำรวจภูธรเมืองสุพรรณบุรี", en: "Suphanburi Provincial Police Station" },
  expLi1: { th: "บันทึกและตรวจสอบข้อมูลในระบบสารสนเทศของสถานีตำรวจ", en: "Recorded and verified data in the police station's information system." },
  expLi2: { th: "ตรวจสอบความถูกต้องและครบถ้วนของข้อมูลคดีและเอกสารที่เกี่ยวข้อง", en: "Checked the accuracy and completeness of case data and related documents." },
  expLi3: { th: "จัดการข้อมูลและเอกสารเพื่อสนับสนุนการปฏิบัติงานของฝ่ายอำนวยการ", en: "Managed data and documents to support the General Affairs Division's operations." },
  footerH2: { th: "มาคุยกัน", en: "Let's talk" },
  footerP: { th: "เปิดรับโอกาสฝึกงานและงาน Full-Stack Developer — ทักมาได้เลย", en: "Open to internship and Full-Stack Developer opportunities — feel free to reach out." },
  ctaCV: { th: "ดาวน์โหลด CV", en: "Download CV" },
  docsLabel: { th: "เอกสารดาวน์โหลด", en: "Documents" },
  dlCV: { th: "CV", en: "CV" },
  dlResume: { th: "Resume", en: "Resume" },
  dlTranscript: { th: "Transcript", en: "Transcript" },
};

const skillGroups = [
  { cat: "Front-end", items: ["HTML5", "CSS3", "JavaScript", "React"] },
  { cat: "Back-end", items: ["Node.js"] },
  { cat: "Database", items: ["MySQL", "MongoDB"] },
  { cat: "Languages", items: ["C#", "Python"] },
  { cat: "Design", items: ["Figma"] },
];

const projects = [
  {
    version: "v3.2", featured: true, title: "HealthChat",
    meta: { th: "ปี 3 · เทอม 2", en: "Year 3 · Sem 2" },
    kv: [
      { k: "Problem", th: "คนทั่วไปอยากได้คำแนะนำโภชนาการเบื้องต้นแต่ไม่รู้จะเริ่มจากไหน", en: "People want basic nutrition guidance but don't know where to start." },
      { k: "Solution", th: "แชทบอทที่ใช้ LLM ตอบคำถามโภชนาการ คำนวณแคลอรี่ แนะนำการควบคุมอาหาร", en: "A chatbot powered by an LLM that answers nutrition questions, calculates calories, and suggests diet adjustments." },
      { k: "Role", th: "ออกแบบระบบแชท เชื่อมต่อ LLM ผ่าน LangChain พัฒนาระบบสมาชิก", en: "Designed the chat system, integrated the LLM via LangChain, and built the membership system." },
      { k: "Outcome", th: "ฝึกเชื่อมต่อ LLM เข้าระบบจริง ออกแบบ prompt ให้ตอบในขอบเขตที่ปลอดภัย", en: "Learned to integrate an LLM into a real system and design prompts that stay within safe response boundaries." },
    ],
    tech: ["Python", "LangChain", "LLaMA 3.1", "MongoDB"],
    proofUrl: "https://github.com/nicha-kkkkk/Healthchat.github.io",
    posterUrl: "/posters/healthchat-poster.jpg",
  },
  {
    version: "v3.1", featured: true, title: "Denim", tag: "Solo · Featured",
    meta: { th: "ปี 3 · เทอม 2", en: "Year 3 · Sem 2" },
    kv: [
      { k: "Problem", th: "ร้านขายเสื้อผ้าเดนิมยังไม่มีระบบขายออนไลน์ที่จัดการสินค้าและคำสั่งซื้อครบวงจร", en: "A denim clothing store had no online store to fully manage products and orders." },
      { k: "Solution", th: "ระบบ e-commerce เต็มระบบ ตะกร้าสินค้า คำสั่งซื้อ ยืนยันชำระเงินผ่านสลิป", en: "A full e-commerce system with cart, checkout, and slip-based payment confirmation." },
      { k: "Role", th: "ออกแบบและพัฒนาทั้งระบบคนเดียว — database, backend, หน้าเว็บ", en: "Designed and built the entire system solo — database, backend, and front-end." },
      { k: "Outcome", th: "โปรเจกต์ที่พิสูจน์ทักษะ full-stack ชัดที่สุด เพราะรับผิดชอบทุกส่วนคนเดียว", en: "The project that best proves full-stack ability, since every part was built alone." },
    ],
    tech: ["C#", "MySQL"],
    proofUrl: "https://github.com/nicha-kkkkk/Denim.github.io",
  },
  {
    version: "v3.0", title: "Kitsune Omakase",
    meta: { th: "ปี 3 · เทอม 1", en: "Year 3 · Sem 1" },
    kv: [
      { k: "Problem", th: "ร้านโอมากาเสะจัดการการจองและข้อมูลลูกค้าด้วยมือ เกิดความผิดพลาดง่าย", en: "An omakase restaurant managed bookings and customer data manually, leading to frequent errors." },
      { k: "Solution", th: "ระบบจองคอร์สอาหาร เลือกคอร์ส แจ้งแพ้อาหาร ปรับเมนู ชำระเงินผ่านสลิป", en: "A course-reservation system for selecting menus, flagging allergies, adjusting orders, and paying via slip." },
      { k: "Role", th: "ออกแบบ UX/UI ทั้งระบบด้วย Figma พัฒนาหน้าจองและชำระเงิน", en: "Designed the full UX/UI in Figma and built the booking and payment pages." },
      { k: "Tech role", th: "เชื่อมต่อฐานข้อมูลสำหรับจัดการเมนูฝั่งผู้ดูแล", en: "Connected the database for admin-side menu management." },
    ],
    tech: ["React", "Node.js", "MongoDB", "Figma"],
    proofUrl: "https://github.com/nicha-kkkkk/OmakaseReservationSystem.github.io",
  },
  {
    version: "v2.0", title: "ParkMate",
    meta: { th: "ปี 2", en: "Year 2" },
    kv: [
      { k: "Problem", th: "ลานจอดรถเดิมไม่มีระบบจองที่จอดหรือตรวจสอบประวัติการใช้งาน", en: "The existing parking lot had no way to reserve a spot or check usage history." },
      { k: "Solution", th: "ระบบค้นหาที่จอดว่าง จองล่วงหน้า สมัครสมาชิก เก็บประวัติการจอด", en: "A system to find open spots, book in advance, register members, and log parking history." },
      { k: "Role", th: "ออกแบบหน้าตาเว็บไซต์ พัฒนาระบบสมาชิก/ล็อกอิน เชื่อมต่อฐานข้อมูล", en: "Designed the UI, built the membership/login system, and connected the database." },
    ],
    tech: ["React", "Node.js", "MySQL"],
    proofUrl: null,
    posterUrl: "/posters/parkmate-poster.jpg",
  },
  {
    version: "v1.0", title: "IV VAN",
    meta: { th: "ปี 1 · เทอม 1", en: "Year 1 · Sem 1" },
    kv: [
      { k: "Problem", th: "การจองรถตู้เดินทางข้ามจังหวัดหลายวันยังไม่มีระบบที่ใช้งานง่าย", en: "Booking multi-day interprovincial van trips had no easy-to-use system." },
      { k: "Solution", th: "ต้นแบบเว็บไซต์จองรถตู้ ออกแบบด้วยแนวคิด Design Thinking", en: "A van-booking website prototype designed using the Design Thinking approach." },
      { k: "Role", th: "เสนอหัวข้อและแนวคิดของระบบ ออกแบบ UX/UI ด้วย Figma", en: "Proposed the project concept and designed the UX/UI in Figma." },
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Figma"],
    proofUrl: null,
    posterUrl: "/posters/iv-van-poster.jpg",
  },
];

/* ---------- scroll-reveal hook ---------- */
function useReveal() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// eslint-disable-next-line react/prop-types
function Reveal({ as: Tag = "div", className = "", style = {}, children }) {
  const [ref, inView] = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} style={style}>
      {children}
    </Tag>
  );
}

export default function Portfolio2() {
  const [lang, setLang] = useState("th");
  const [mounted, setMounted] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const t = (key) => I18N[key][lang];

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(id);
  }, []);

  const nameWords = t("name").split(" ");

  return (
    <div className="p2-root">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap"
        rel="stylesheet"
      />
      <style>{`
  .p2-root{
    --bg:#fffdf8; --ink:#23262e; --muted:#83889a; --muted-2:#b7bccb;
    --blue:#6fa3d8; --pink:#f2a6c4; --yellow:#ffcf6b; --line:#edeff3;
    background:var(--bg); color:var(--ink); font-family:'Inter',sans-serif;
    line-height:1.65; -webkit-font-smoothing:antialiased; overflow-x:hidden; position:relative;
  }
  .p2-root *{box-sizing:border-box;}
  .p2-root h1,.p2-root h2,.p2-root h3{font-family:'Space Grotesk',sans-serif;}
  .p2-root a{color:inherit;}
  .p2-wrap{max-width:900px;margin:0 auto;padding:0 28px;position:relative;z-index:1;}

  /* ambient floating blobs */
  .blob{position:absolute;border-radius:50%;filter:blur(50px);opacity:.35;pointer-events:none;z-index:0;}
  .blob1{width:340px;height:340px;background:var(--blue);top:-80px;right:-60px;animation:floatA 14s ease-in-out infinite;}
  .blob2{width:260px;height:260px;background:var(--pink);top:220px;left:-100px;animation:floatB 17s ease-in-out infinite;}
  .blob3{width:200px;height:200px;background:var(--yellow);top:520px;right:120px;animation:floatA 12s ease-in-out infinite reverse;}
  @keyframes floatA{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(30px,-40px) scale(1.08);}}
  @keyframes floatB{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-25px,35px) scale(1.05);}}

  /* nav */
  header.p2-top{position:sticky;top:0;z-index:30;background:rgba(255,253,248,.86);backdrop-filter:blur(10px);border-bottom:1px solid var(--line);}
  .p2-navrow{display:flex;align-items:center;justify-content:space-between;padding:16px 0;max-width:900px;margin:0 auto;padding-left:28px;padding-right:28px;gap:16px;}
  .p2-navrow .id{font-family:'Space Grotesk';font-weight:700;font-size:15px;}
  .p2-navrow nav{display:flex;gap:24px;font-size:14px;color:var(--muted);}
  .p2-navrow nav a{text-decoration:none;position:relative;padding-bottom:2px;}
  .p2-navrow nav a::after{content:'';position:absolute;left:0;bottom:0;width:0;height:2px;background:var(--pink);transition:width .25s ease;}
  .p2-navrow nav a:hover::after{width:100%;}
  .p2-navright{display:flex;align-items:center;gap:16px;}
  .p2-status{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--muted);white-space:nowrap;}
  .p2-status .dot{width:7px;height:7px;border-radius:50%;background:#5fc98a;box-shadow:0 0 0 0 rgba(95,201,138,.5);animation:pulse 2s infinite;}
  @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(95,201,138,.5);}70%{box-shadow:0 0 0 8px rgba(95,201,138,0);}100%{box-shadow:0 0 0 0 rgba(95,201,138,0);}}

  .p2-lang{position:relative;display:flex;border:1px solid var(--line);border-radius:20px;padding:3px;font-family:'IBM Plex Mono';font-size:12px;}
  .p2-lang button{position:relative;z-index:1;background:none;border:none;padding:5px 12px;border-radius:16px;cursor:pointer;color:var(--muted);font-family:'IBM Plex Mono';font-size:12px;transition:color .25s;}
  .p2-lang button.active{color:#fff;}
  .p2-lang .pill{position:absolute;top:3px;bottom:3px;width:calc(50% - 3px);background:var(--ink);border-radius:16px;transition:transform .3s cubic-bezier(.4,0,.2,1);}
  .p2-lang .pill.en{transform:translateX(100%);}

  /* hero */
  .p2-hero{padding:100px 0 90px;position:relative;}
  .p2-hero-grid{display:grid;grid-template-columns:1.5fr 1fr;gap:44px;align-items:center;}
  .p2-eyebrow{display:flex;align-items:center;gap:10px;color:var(--blue);font-family:'IBM Plex Mono';font-size:13px;margin-bottom:20px;}
  .p2-eyebrow .bar{width:22px;height:2px;background:var(--pink);border-radius:2px;}
  .p2-name{font-size:clamp(30px,5vw,56px);font-weight:800;line-height:1.1;letter-spacing:-.02em;margin:0 0 22px;white-space:nowrap;}
  .p2-name .word{display:inline-block;opacity:0;transform:translateY(24px) rotate(-2deg);transition:opacity .6s ease, transform .6s cubic-bezier(.2,.8,.3,1.2);}
  .p2-name .word.nick{color:var(--muted-2);}
  .p2-root.mounted .p2-name .word{opacity:1;transform:translateY(0) rotate(0deg);}
  .p2-name .word:nth-child(1){transition-delay:.05s;}
  .p2-name .word:nth-child(2){transition-delay:.15s;}
  .p2-name .word:nth-child(3){transition-delay:.25s;}
  .p2-role{font-size:18px;line-height:1.55;color:var(--muted);margin:0 0 28px;max-width:520px;}
  .p2-role b{color:var(--ink);font-weight:600;}
  .p2-intro{font-size:15.5px;line-height:1.7;color:#5b626b;max-width:540px;margin:0 0 36px;}
  .p2-ctas{display:flex;gap:14px;flex-wrap:wrap;}
  .p2-btn{font-family:'Space Grotesk';font-weight:600;font-size:14.5px;padding:13px 22px;border:2px solid var(--ink);text-decoration:none;display:inline-flex;align-items:center;gap:8px;border-radius:30px;transition:transform .2s ease, box-shadow .2s ease;}
  .p2-btn.primary{background:var(--ink);color:#fff;}
  .p2-btn:hover{transform:translateY(-3px);box-shadow:4px 6px 0 var(--pink);}
  .p2-btn.primary:hover{box-shadow:4px 6px 0 var(--yellow);}

  .p2-photo-wrap{position:relative;}
  .p2-photo-badge{
    position:absolute;top:-18px;right:-18px;width:78px;height:78px;border-radius:50%;
    background:var(--yellow);z-index:3;display:flex;align-items:center;justify-content:center;
    animation:spin 14s linear infinite;
  }
  .p2-photo-badge svg{width:70px;height:70px;}
  @keyframes spin{to{transform:rotate(360deg);}}
  .p2-photo-frame{position:relative;transform:rotate(-3deg);transition:transform .35s ease;}
  .p2-photo-frame:hover{transform:rotate(0deg);}
  .p2-photo-frame::before{content:'';position:absolute;top:16px;left:16px;width:100%;height:100%;background:var(--pink);border-radius:6px;z-index:0;}
  .p2-photo{position:relative;z-index:1;width:100%;aspect-ratio:4/5;border-radius:6px;border:1px solid var(--line);background:#f4f4f4;overflow:hidden;}
  .p2-photo img{width:100%;height:100%;object-fit:cover;display:block;}

  /* section shell */
  .p2-sec{padding:64px 0;border-top:1px solid var(--line);position:relative;}
  .p2-sec-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:30px;gap:16px;flex-wrap:wrap;}
  .p2-sec-head h2{font-size:26px;font-weight:700;margin:0;position:relative;display:inline-block;}
  .p2-sec-head h2::after{content:'';position:absolute;left:0;bottom:-4px;height:8px;width:0%;background:var(--yellow);z-index:-1;opacity:.6;transition:width .6s ease .1s;}
  .reveal.in .p2-sec-head h2::after{width:100%;}
  .p2-tag{font-family:'IBM Plex Mono';font-size:12.5px;color:var(--muted-2);}

  .reveal{opacity:0;transform:translateY(26px);transition:opacity .6s ease, transform .6s ease;}
  .reveal.in{opacity:1;transform:translateY(0);}

  /* about */
  .p2-about-grid{display:grid;grid-template-columns:1fr 1fr;gap:36px;}
  .p2-about-grid p{color:#4a5058;font-size:15.5px;margin:0 0 14px;}
  .p2-facts{font-family:'IBM Plex Mono';font-size:13px;color:var(--muted);display:flex;flex-direction:column;gap:14px;}
  .p2-facts div{display:flex;flex-direction:column;gap:3px;}
  .p2-facts span.k{color:var(--muted-2);font-size:11px;}

  /* skills */
  .p2-skillrow{display:grid;grid-template-columns:120px 1fr;gap:16px;padding:12px 0;align-items:start;}
  .p2-skillrow .cat{font-family:'Space Grotesk';font-weight:600;font-size:14px;color:var(--muted);padding-top:6px;}
  .p2-chips{display:flex;flex-wrap:wrap;gap:9px;}
  .p2-chip{font-family:'IBM Plex Mono';font-size:12.5px;color:#3c4552;border:1.5px solid var(--line);padding:7px 12px;border-radius:20px;background:#fff;transition:transform .2s cubic-bezier(.4,0,.2,1), border-color .2s, background .2s;cursor:default;}
  .p2-chip:hover{transform:translateY(-4px) rotate(-3deg);border-color:var(--pink);background:#fdf2f6;}

  .p2-fttag{color:#c0698c;font-family:'IBM Plex Mono';font-size:11px;border:1px solid #f2a6c466;background:#fdf3f7;padding:2px 8px;margin-left:8px;border-radius:10px;}
  .p2-kv{display:grid;grid-template-columns:1fr 1fr;gap:12px 24px;margin-bottom:16px;}
  .p2-kv .item{font-size:14px;color:#4a5058;}
  .p2-kv .item b{display:block;color:var(--muted);font-size:12px;font-family:'IBM Plex Mono';font-weight:500;margin-bottom:3px;}
  @media(max-width:640px){.p2-kv{grid-template-columns:1fr;}}
  .p2-tech{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;}
  .p2-tech span{font-family:'IBM Plex Mono';font-size:11px;color:#6a86a3;border:1px solid #6fa3d84d;padding:3px 8px;background:#f4f9fd;border-radius:10px;}
  .p2-proof{font-size:13px;}
  .p2-proof a{color:var(--blue);text-decoration:none;border-bottom:1px solid transparent;}
  .p2-proof a:hover{border-bottom-color:var(--blue);}
  .p2-proof .none{color:var(--muted-2);font-style:italic;}

  /* projects — timeline layout (kept from v1) */
  .p2-log{position:relative;}
  .p2-log-line{position:absolute;left:41px;top:8px;bottom:8px;width:1px;background:var(--line);}
  .p2-entry{display:grid;grid-template-columns:82px 1fr;gap:0 22px;position:relative;padding-bottom:52px;}
  .p2-entry:last-child{padding-bottom:0;}
  .p2-ver{position:relative;padding-top:2px;}
  .p2-ver .vnum{font-family:'IBM Plex Mono';font-size:12.5px;color:var(--muted-2);}
  .p2-ver .vdot{position:absolute;left:35px;top:5px;width:12px;height:12px;border-radius:50%;background:var(--pink);border:2px solid var(--pink);}
  .p2-entry.featured .p2-ver .vdot{width:14px;height:14px;left:34px;box-shadow:0 0 0 4px rgba(111,163,216,.18);}
  .p2-entry-body h3{font-size:19px;margin:0 0 4px;font-weight:700;display:inline;}
  .p2-entry-body .meta{font-family:'IBM Plex Mono';font-size:12px;color:var(--muted-2);margin:10px 0 14px;}
  @media(max-width:640px){
    .p2-entry{grid-template-columns:56px 1fr;}
    .p2-log-line{left:29px;}
    .p2-ver .vdot{left:23px;}
  }

  /* experience */
  .p2-xp{display:flex;gap:18px;align-items:flex-start;}
  .p2-xp .yr{font-family:'IBM Plex Mono';font-size:12.5px;color:#fff;background:var(--ink);padding:4px 10px;border-radius:20px;white-space:nowrap;}
  .p2-xp h3{margin:0 0 4px;font-size:17px;font-weight:700;}
  .p2-xp .org{color:var(--muted);font-size:14px;margin-bottom:10px;}
  .p2-xp ul{margin:0;padding-left:18px;color:#4a5058;font-size:14.5px;}
  .p2-xp li{margin-bottom:6px;}

  /* footer */
  .p2-foot{padding:70px 0 50px;position:relative;}
  .p2-foot h2{font-size:30px;margin:0 0 14px;font-weight:800;}
  .p2-foot p{color:var(--muted);max-width:460px;margin:0 0 32px;font-size:15.5px;}
  .p2-docs{margin-bottom:34px;}
  .p2-docs-label{font-family:'IBM Plex Mono';font-size:12px;color:var(--muted-2);margin-bottom:12px;}
  .p2-docs-row{display:flex;flex-wrap:wrap;gap:10px;}
  .p2-doc-btn{
    font-family:'Space Grotesk';font-weight:600;font-size:13.5px;color:var(--ink);
    border:1.5px solid var(--line);padding:9px 16px;border-radius:20px;text-decoration:none;
    background:#fff;transition:transform .2s ease, border-color .2s ease, box-shadow .2s ease;
  }
  .p2-doc-btn:hover{transform:translateY(-3px);border-color:var(--blue);box-shadow:3px 4px 0 var(--pink);}
  .p2-contact{display:flex;flex-direction:column;gap:2px;margin-bottom:36px;}
  .p2-contact a,.p2-contact .row{display:flex;align-items:center;justify-content:space-between;padding:15px 4px;border-bottom:1px solid var(--line);text-decoration:none;font-family:'Space Grotesk';font-size:16px;font-weight:600;transition:padding-left .25s ease, color .25s ease;}
  .p2-contact a:hover{padding-left:12px;color:var(--blue);}
  .p2-contact .k{color:var(--muted-2);font-family:'IBM Plex Mono';font-size:12px;font-weight:400;}
  .p2-bottom{display:flex;justify-content:space-between;color:var(--muted-2);font-size:12px;font-family:'IBM Plex Mono';flex-wrap:wrap;gap:8px;}

  @media(max-width:780px){
    .p2-hero-grid{grid-template-columns:1fr;}
    .p2-photo-wrap{order:-1;max-width:240px;margin:0 auto 30px;}
  }
  @media(max-width:420px){
    .p2-name{white-space:normal;font-size:9vw;}
  }
  @media(max-width:640px){
    .p2-about-grid{grid-template-columns:1fr;}
    .p2-skillrow{grid-template-columns:1fr;gap:6px;}
    .p2-navrow nav{display:none;}
  }
  .p2-proof-btn{
    background:none;border:none;padding:0;margin:0;font:inherit;color:var(--blue);cursor:pointer;
    text-decoration:none;border-bottom:1px solid transparent;font-family:'Inter',sans-serif;font-size:13px;
  }
  .p2-proof-btn:hover{border-bottom-color:var(--blue);}

  .p2-lightbox{
    position:fixed;inset:0;background:rgba(20,20,24,.82);z-index:100;
    display:flex;align-items:center;justify-content:center;padding:32px;
    animation:lbFadeIn .2s ease;
  }
  @keyframes lbFadeIn{from{opacity:0;}to{opacity:1;}}
  .p2-lightbox img{
    max-width:min(900px,92vw);max-height:88vh;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,.4);
    animation:lbZoomIn .25s cubic-bezier(.2,.8,.3,1);
  }
  @keyframes lbZoomIn{from{transform:scale(.94);opacity:0;}to{transform:scale(1);opacity:1;}}
  .p2-lightbox-close{
    position:absolute;top:22px;right:26px;background:rgba(255,255,255,.12);color:#fff;border:none;
    width:40px;height:40px;border-radius:50%;font-size:18px;cursor:pointer;transition:background .2s;
  }
  .p2-lightbox-close:hover{background:rgba(255,255,255,.24);}

  @media (prefers-reduced-motion: reduce){
    .blob, .p2-photo-badge, .p2-status .dot{animation:none !important;}
    .reveal, .p2-name .word, .p2-entry, .p2-chip, .p2-btn{transition:none !important;}
  }
      `}</style>

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <header className="p2-top">
        <div className="p2-navrow">
          <div className="id">{t("brandName")} <span style={{ color: "var(--muted-2)" }}>· Portfolio</span></div>
          <nav>
            <a href="#about">{t("navAbout")}</a>
            <a href="#skills">{t("navSkills")}</a>
            <a href="#work">{t("navWork")}</a>
            <a href="#contact">{t("navContact")}</a>
          </nav>
          <div className="p2-navright">
            <div className="p2-status"><span className="dot"></span>{t("status")}</div>
            <div className="p2-lang">
              <div className={`pill ${lang === "en" ? "en" : ""}`}></div>
              <button className={lang === "th" ? "active" : ""} onClick={() => setLang("th")}>TH</button>
              <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
            </div>
          </div>
        </div>
      </header>

      <div className={`p2-root-inner ${mounted ? "mounted" : ""}`} style={{ position: "relative" }}>
      </div>

      <main className="p2-wrap" style={{ position: "relative" }}>
        <section className={`p2-hero ${mounted ? "mounted" : ""}`}>
          <div className="p2-hero-grid">
            <div>
              <div className="p2-eyebrow"><span className="bar"></span>Full-Stack Developer — Student</div>
              <h1 className={`p2-name ${mounted ? "mounted" : ""}`}>
                {nameWords.map((w, i) => (
                  <span className="word" key={i} style={mounted ? { opacity: 1, transform: "translateY(0) rotate(0deg)" } : {}}>
                    {w}&nbsp;
                  </span>
                ))}
                <span className="word nick" style={mounted ? { opacity: 1, transform: "translateY(0) rotate(0deg)" } : {}}>
                  {t("nickname")}
                </span>
              </h1>
              <p className="p2-role">
                {t("role").split("||")[0]}
                <br />
                <b>{t("role").split("||")[1]}</b>
              </p>
              <p className="p2-intro">{t("intro")}</p>
              <div className="p2-ctas">
                <a href="#work" className="p2-btn primary">{t("ctaView")}</a>
                <a href="mailto:nichawanwon@gmail.com" className="p2-btn">{t("ctaContact")}</a>
                <a href="/docs/Nicha_Wanwon_CV.pdf" download className="p2-btn">{t("ctaCV")}</a>
              </div>
            </div>
            <div className="p2-photo-wrap">
              <div className="p2-photo-badge">
                <svg viewBox="0 0 100 100">
                  <defs>
                    <path id="circlePath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                  </defs>
                  <text fontSize="10" fontFamily="IBM Plex Mono" fill="#23262e" letterSpacing="1">
                    <textPath href="#circlePath">• OPEN TO WORK • OPEN TO WORK </textPath>
                  </text>
                </svg>
              </div>
              <div className="p2-photo-frame">
                <div className="p2-photo">
                  <img src="/profile.jpg" alt="นิชา วันวอน" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="p2-sec">
          <Reveal className="p2-sec-head" style={{ marginBottom: 30 }}>
            <h2>{t("aboutH2")}</h2>
            <span className="p2-tag">about</span>
          </Reveal>
          <Reveal className="p2-about-grid">
            <div>
              <p>{t("aboutP1")}</p>
              <p>{t("aboutP2")}</p>
            </div>
            <div className="p2-facts">
              <div><span className="k">{t("factEduK")}</span> {t("factEduV")}</div>
              <div><span className="k">CGPA</span> 3.87</div>
              <div><span className="k">{t("factPriorK")}</span> {t("factPriorV")}</div>
              <div><span className="k">{t("factTrackK")}</span> Full-Stack Development</div>
            </div>
          </Reveal>
        </section>

        <section id="skills" className="p2-sec">
          <Reveal className="p2-sec-head" style={{ marginBottom: 30 }}>
            <h2>{t("skillsH2")}</h2>
            <span className="p2-tag">skills</span>
          </Reveal>
          <Reveal>
            {skillGroups.map((g) => (
              <div className="p2-skillrow" key={g.cat}>
                <div className="cat">{g.cat}</div>
                <div className="p2-chips">
                  {g.items.map((i) => (
                    <span className="p2-chip" key={i}>{i}</span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </section>

        <section id="work" className="p2-sec">
          <Reveal className="p2-sec-head" style={{ marginBottom: 30 }}>
            <h2>{t("workH2")}</h2>
            <span className="p2-tag">{t("workTag")}</span>
          </Reveal>
          <div className="p2-log">
            <div className="p2-log-line"></div>
            {projects.map((p) => (
              <Reveal
                key={p.version}
                as="div"
                className={`p2-entry${p.featured ? " featured" : ""}`}
              >
                <div className="p2-ver">
                  <div className="vdot"></div>
                  <span className="vnum">{p.version}</span>
                </div>
                <div className="p2-entry-body">
                  <h3>
                    {p.title}
                    {p.tag && <span className="p2-fttag">{p.tag}</span>}
                  </h3>
                  <div className="meta">{p.meta[lang]}</div>
                  <div className="p2-kv">
                    {p.kv.map((item) => (
                      <div className="item" key={item.k}>
                        <b>{item.k}</b>
                        {item[lang]}
                      </div>
                    ))}
                  </div>
                  <div className="p2-tech">
                    {p.tech.map((tItem) => (
                      <span key={tItem}>{tItem}</span>
                    ))}
                  </div>
                  <div className="p2-proof">
                    {p.proofUrl && <a href={p.proofUrl} target="_blank" rel="noopener noreferrer">Source →</a>}
                    {p.proofUrl && p.posterUrl && <span> · </span>}
                    {p.posterUrl && (
                      <button type="button" className="p2-proof-btn" onClick={() => setLightbox(p.posterUrl)}>
                        View poster →
                      </button>
                    )}
                    {!p.proofUrl && !p.posterUrl && <span className="none">Repo อยู่ระหว่างจัดเตรียม</span>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="experience" className="p2-sec">
          <Reveal className="p2-sec-head" style={{ marginBottom: 30 }}>
            <h2>{t("expH2")}</h2>
            <span className="p2-tag">experience</span>
          </Reveal>
          <Reveal className="p2-xp">
            <div className="yr">{t("expYr")}</div>
            <div>
              <h3>{t("expTitle")}</h3>
              <div className="org">{t("expOrg")}</div>
              <ul>
                <li>{t("expLi1")}</li>
                <li>{t("expLi2")}</li>
                <li>{t("expLi3")}</li>
              </ul>
            </div>
          </Reveal>
        </section>
      </main>

      <footer id="contact" className="p2-foot">
        <div className="p2-wrap">
          <Reveal as="h2">{t("footerH2")}</Reveal>
          <Reveal as="p">{t("footerP")}</Reveal>
          <Reveal className="p2-docs">
            <div className="p2-docs-label">{t("docsLabel")}</div>
            <div className="p2-docs-row">
              <a href="/docs/Nicha_Wanwon_CV.pdf" download className="p2-doc-btn">⬇ {t("dlCV")}</a>
              <a href="/docs/Nicha_Wanwon_Resume.pdf" download className="p2-doc-btn">⬇ {t("dlResume")}</a>
              <a href="/docs/Nicha_Wanwon_Transcript.pdf" download className="p2-doc-btn">⬇ {t("dlTranscript")}</a>
            </div>
          </Reveal>
          <Reveal className="p2-contact">
            <a href="mailto:nichawanwon@gmail.com"><span>nichawanwon@gmail.com</span><span className="k">email</span></a>
            <a href="tel:+66990979480"><span>099-097-9480</span><span className="k">phone</span></a>
            <a href="https://github.com/nicha-kkkkk" target="_blank" rel="noopener noreferrer"><span>github.com/nicha-kkkkk</span><span className="k">github</span></a>
            <a href="https://line.me/ti/p/qcDZsC6mSP" target="_blank" rel="noopener noreferrer"><span>yok__333</span><span className="k">line</span></a>
          </Reveal>
          <div className="p2-bottom">
            <span>© 2569 Nicha Wanwon</span>
            <span>Built with React + Vibe Coding</span>
          </div>
        </div>
      </footer>

      {lightbox && (
        <div className="p2-lightbox" onClick={() => setLightbox(null)}>
          <button className="p2-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
          <img src={lightbox} alt="Project poster" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
