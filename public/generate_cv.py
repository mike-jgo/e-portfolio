#!/usr/bin/env python3
"""
Michael Joseph L. Go — CV Generator
Follows the official Harvard MCS Resume Template (Bullet Points version).

Format highlights from the template:
- Centered, bold, Title Case section headers (no rules)
- Bold Organization (left) with City, State (right)
- Bold Position Title (left) with Month Year – Month Year (right)
- Solid round bullets (●)
- Phrases starting with action verbs, no personal pronouns, no full sentences
- Combined Skills & Interests section
- Leadership & Activities (not a separate Activities section)

Output: Michael_Go_CV.pdf in the current working directory.
"""

from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.pagesizes import LETTER
from reportlab.lib import colors

# Harvard samples use US Letter; switching from A4 to match.
W, H = LETTER

ML = 18 * mm
MR = 18 * mm
MT = 15 * mm
MB = 12 * mm
AVAIL_W = W - ML - MR

BLACK = colors.black

def S(name, **kw):
    return ParagraphStyle(name, **kw)

NAME_S    = S('name',    fontName='Times-Bold',   fontSize=16,   textColor=BLACK, leading=19,   alignment=1)
CONTACT_S = S('contact', fontName='Times-Roman',  fontSize=10,   textColor=BLACK, leading=13,   alignment=1)
SEC_S     = S('sec',     fontName='Times-Bold',   fontSize=11,   textColor=BLACK, leading=13,   alignment=1)
ENTRY_S   = S('entry',   fontName='Times-Bold',   fontSize=10.5, textColor=BLACK, leading=13)
SUB_S     = S('sub',     fontName='Times-Bold',   fontSize=10.5, textColor=BLACK, leading=13)
BODY_S    = S('body',    fontName='Times-Roman',  fontSize=10,   textColor=BLACK, leading=12.5)
BUL_S     = S('bul',     fontName='Times-Roman',  fontSize=10,   textColor=BLACK, leading=12.5,
              leftIndent=6*mm, firstLineIndent=-4*mm)
SKILL_S   = S('skill',   fontName='Times-Roman',  fontSize=10,   textColor=BLACK, leading=13)

OUT = 'Michael_Go_CV.pdf'
c = pdfcanvas.Canvas(OUT, pagesize=LETTER)
y = H - MT


# ── Helpers ───────────────────────────────────────────────────────────────────

def draw_para(text, style, gap=1*mm):
    global y
    p = Paragraph(text, style)
    _, h = p.wrapOn(c, AVAIL_W, 9999)
    if y - h < MB:
        new_page()
    p.drawOn(c, ML, y - h)
    y -= h + gap

def check_space(needed=15*mm):
    global y
    if y - needed < MB:
        new_page()

def section(label, gap_before=3*mm, gap_after=1.5*mm):
    """Centered, bold, Title Case section header — no rule line, per template."""
    global y
    y -= gap_before
    check_space(14*mm)
    draw_para(label, SEC_S, gap_after)

def two_col_line(left_text, right_text, left_style, right_font='Times-Roman',
                 right_size=10.5, gap=0.4*mm):
    """Render a line with left-aligned text (bold or plain) and right-aligned text."""
    global y
    p = Paragraph(left_text, left_style)
    _, h = p.wrapOn(c, AVAIL_W, 9999)
    p.drawOn(c, ML, y - h)
    c.saveState()
    c.setFont(right_font, right_size)
    c.setFillColor(BLACK)
    c.drawRightString(ML + AVAIL_W, y - h + 1.5, right_text)
    c.restoreState()
    y -= h + gap

def org_line(org, location, gap=0.4*mm):
    """Bold organization on the left, plain location on the right."""
    two_col_line(org, location, ENTRY_S, 'Times-Roman', 10.5, gap)

def role_line(role, dates, gap=1.2*mm):
    """Bold role title on the left, italic dates on the right."""
    two_col_line(role, dates, SUB_S, 'Times-Italic', 10.5, gap)

def bullet(text):
    draw_para(f'• &nbsp;{text}', BUL_S, 0.4*mm)

def new_page():
    global y
    c.showPage()
    c.saveState()
    c.setFillColor(colors.white)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.restoreState()
    y = H - MT

# ── HEADER ────────────────────────────────────────────────────────────────────

draw_para('Michael Joseph L. Go', NAME_S, 1*mm)
draw_para(
    'Quezon City 1100&nbsp;•&nbsp;michaeljgo33@gmail.com&nbsp;•&nbsp;+63 976 123 0768',
    CONTACT_S, 0.3*mm
)
draw_para(
    'linkedin.com/in/michaeljgo&nbsp;•&nbsp;github.com/mike-jgo',
    CONTACT_S, 2*mm
)


# ── EDUCATION ─────────────────────────────────────────────────────────────────

section('Education')

org_line('De La Salle University', 'Manila, Philippines')
role_line('Bachelor of Science in Computer Science, Major in Software Technology',
          'Expected October 2026')
draw_para('<b>Minor in Data Science</b>', SUB_S, 0.8*mm)
draw_para(
    '<b>Relevant Coursework:</b>&nbsp; Data Structures and Algorithms, Advanced Software Engineering, '
    'Advanced Database Systems, Computer Networks, Operating Systems, Secure Web Development',
    BODY_S, 2.5*mm
)

org_line('Xavier University – Ateneo de Cagayan', 'Cagayan de Oro, Philippines')
role_line('Senior High School, Science, Technology, Engineering, and Mathematics Strand',
          'June 2019 – June 2021')
y -= 1.5*mm

org_line('Xavier University – Ateneo de Cagayan', 'Cagayan de Oro, Philippines')
role_line('Junior High School', 'June 2016 – June 2019')
y -= 1.5*mm


# ── EXPERIENCE ────────────────────────────────────────────────────────────────

section('Experience')

org_line('Tensei Philippines Inc.', 'Manila, Philippines')
role_line('Software Developer Intern, Full-Stack', 'March 2025 – June 2025')
for b in [
    'Refactored a 2,000-line inventory application into a modular, component-based architecture, '
    'reducing average file size to approximately 400 lines.',
    'Developed full-stack features for an internal DevOps inventory system using Laravel and Vue 3, '
    'designed with modularity to support future client deployments.',
    'Produced interactive Figma prototypes for the inventory system and additional internal projects.',
    'Collaborated with a three-person intern team on planning, code review, and iterative delivery.',
]:
    bullet(b)
y -= 2*mm

org_line('Dr. Tayste Bud Corporation', 'Quezon City, Philippines')
role_line('Information Technology and Administrative Officer, Part-Time', 'June 2021 – Present')
for b in [
    'Administered point-of-sale systems, corporate email, and payment workflows across a 10-employee restaurant operation '
    'as the sole technical point of contact.',
    'Led migration of the cheque issuance process from manual handwriting to an automated printed system, reducing '
    'processing time and eliminating transcription errors.',
    'Initiated an ongoing rollout of an updated point-of-sale platform to smaller branch locations, coordinating '
    'setup, staff training, and data migration.',
    'Handled administrative operations including internal documentation, vendor coordination, and cross-department communication.',
]:
    bullet(b)
y -= 2*mm


# ── PROJECTS ──────────────────────────────────────────────────────────────────
# (Harvard template doesn't have a dedicated Projects section, but technical CVs
#  commonly add one. Keeping it to showcase portfolio work.)

section('Projects')

projects = [
    {
        'title': 'Canvas Discord Bot',
        'date':  '2026',
        'stack': 'Python, Discord.py, Canvas Learning Management System API, Advanced Python Scheduler',
        'bullets': [
            'Engineered an automated pipeline synchronising Canvas announcements and assignment deadlines to a designated '
            'Discord channel via asynchronous task scheduling, message deduplication, and structured logging.',
        ],
    },
    {
        'title': 'Basket Grocery Tracker',
        'date':  '2026',
        'stack': 'React, TypeScript, Vite, Supabase, Vercel',
        'bullets': [
            'Designed and built a full-stack grocery tracker with a TypeScript React frontend and a Supabase serverless '
            'backend for authentication and data storage, deployed with continuous integration on Vercel.',
        ],
        'link': 'github.com/mike-jgo/basket',
    },
    {
        'title': 'Fitlog Workout Tracker',
        'date':  '2025',
        'stack': 'React, Vite, Supabase, Tailwind CSS, Recharts',
        'bullets': [
            'Developed a web application supporting user authentication, workout logging, and Recharts progress '
            'visualisations, architected around reusable React components and deployed to GitHub Pages.',
        ],
        'link': 'github.com/mike-jgo/gym-app',
    },
    {
        'title': 'Inventory Management System',
        'date':  '2025',
        'stack': 'Laravel, Vue 3, Inertia.js, MySQL',
        'bullets': [
            'Built a full-stack inventory management system enabling item creation, editing, and stock level tracking through '
            'a reactive single-page interface, using Inertia.js to bridge Laravel and Vue 3.',
        ],
    },
    {
        'title': 'Metro Manila Weather Prediction Analysis',
        'date':  '2024',
        'stack': 'Python, Selenium, Pandas, NumPy, Scikit-learn',
        'bullets': [
            'Scraped and cleaned multi-year historical Metro Manila weather data using Selenium and Pandas, then applied '
            'supervised learning algorithms from Scikit-learn to forecast weather patterns.',
        ],
    },
    {
        'title': 'Cold Storage Facility Showcase Website',
        'date':  '2023',
        'stack': 'Node.js, Express.js, Mocha',
        'bullets': [
            'Served as back-end developer and quality assurance, building Express.js content management endpoints and '
            'Mocha test suites for an administrator-editable content system requiring no developer involvement for updates.',
        ],
    },
]

for p in projects:
    two_col_line(p['title'], p['date'], ENTRY_S, 'Times-Roman', 10.5, 0.4*mm)
    draw_para(f"<i>{p['stack']}</i>", BODY_S, 0.4*mm)
    for b in p['bullets']:
        bullet(b)
    if 'link' in p:
        draw_para(
            f"<i>{p['link']}</i>",
            S('link', fontName='Times-Italic', fontSize=9, textColor=BLACK, leading=11),
            1.5*mm
        )
    else:
        y -= 1.5*mm


# ── LEADERSHIP & ACTIVITIES ───────────────────────────────────────────────────

section('Leadership &amp; Activities')

org_line('ASEAN Data Science Enablement Session', 'Manila, Philippines')
role_line('Participant', 'May 2023')
bullet('Completed an ASEAN-led workshop on SAP Cloud applications for dataset analysis, '
       'engaging with regional peers on practical data science tooling.')
y -= 1.5*mm

org_line('Xavier University Student Government, Department of Communications', 'Cagayan de Oro, Philippines')
role_line('Member', '2019 – 2020')
bullet('Designed infographics and produced documentation supporting school-wide communications and student outreach.')
y -= 1.5*mm

org_line('Media Information Technoculture Club', 'Cagayan de Oro, Philippines')
role_line('President', '2018 – 2019')
bullet('Organised technology events and workshops promoting digital literacy and engagement with technology among peers.')
y -= 1.5*mm


# ── SKILLS & INTERESTS ────────────────────────────────────────────────────────

section('Skills &amp; Interests')

skill_lines = [
    ('Technical',
     'Python, Java, JavaScript, React, Vue 3, Tailwind CSS, Vite, Inertia.js; '
     'Node.js, Express.js, Laravel, Supabase; MySQL, MongoDB; Pandas, NumPy, Scikit-learn, TensorFlow; '
     'Git, Selenium, Cypress, Mocha'),
    ('Design',
     'Figma; User Interface and User Experience Design'),
    ('Methodologies',
     'Agile, Scrum'),
    ('Language',
     'English (fluent), Bisaya (fluent), Filipino (conversational)'),
    ('Interests',
     'Software development, fitness technology, data science applications'),
]

for cat, items in skill_lines:
    draw_para(f'<b>{cat}:</b>&nbsp; {items}', SKILL_S, 1*mm)


# ── Save ──────────────────────────────────────────────────────────────────────

c.setTitle('Michael Joseph Go — Curriculum Vitae')
c.setAuthor('Michael Joseph Go')
c.save()
print(f'Done: {OUT}')
