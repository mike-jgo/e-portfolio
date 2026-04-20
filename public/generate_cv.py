#!/usr/bin/env python3
"""
Michael Joseph L. Go — CV Generator
-----------------------------------
Modern hybrid layout (header + two-column body).
Light theme with forest-green accents and an accent bar on the left.

Output: Michael_Go_CV.pdf in the current working directory.
"""

from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.platypus import Paragraph, HRFlowable
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors

# ── Page geometry ─────────────────────────────────────────────────────────────
W, H = A4

ACCENT_BAR_W = 6 * mm          # green accent bar on the far left of the page
ML           = 16 * mm         # left text margin (after accent bar)
MR           = 14 * mm
MT           = 10 * mm
MB           = 9 * mm

SIDEBAR_W    = 58 * mm
COL_GAP      = 8  * mm
SIDEBAR_X    = ML
MAIN_X       = ML + SIDEBAR_W + COL_GAP
MAIN_W       = W - ML - MR - SIDEBAR_W - COL_GAP
AVAIL_W      = W - ML - MR

# ── Palette ───────────────────────────────────────────────────────────────────
CREAM       = colors.HexColor('#FBF9F4')  # off-white / cream background
INK         = colors.HexColor('#1F2321')  # primary text (near-black, warm)
INK_SOFT    = colors.HexColor('#4A524E')  # secondary text
INK_MUTED   = colors.HexColor('#7A8078')  # tertiary / meta text
RULE        = colors.HexColor('#D9D4C7')  # hairline rules (warm gray)

GREEN       = colors.HexColor('#0F7A3D')  # forest green — primary accent
GREEN_DARK  = colors.HexColor('#0A5A2C')  # darker shade for emphasis
GREEN_SOFT  = colors.HexColor('#E6F0EA')  # very light tint for tag chips (unused subtly)

# ── Style factory ─────────────────────────────────────────────────────────────
def S(name, **kw):
    return ParagraphStyle(name, **kw)

# Header
H_NAME       = S('h_name',       fontName='Helvetica-Bold', fontSize=24,  textColor=INK,      leading=28, tracking=0)
H_NAME_SMALL = S('h_name_small', fontName='Helvetica-Bold', fontSize=14,  textColor=INK,      leading=18)
H_TITLE      = S('h_title',      fontName='Helvetica',      fontSize=11,  textColor=GREEN,    leading=14)
H_CONT       = S('h_cont',       fontName='Helvetica',      fontSize=8.5, textColor=INK_SOFT, leading=12)

# Main column
M_SEC    = S('m_sec',    fontName='Helvetica-Bold', fontSize=9,   textColor=GREEN,    leading=12)
M_IT     = S('m_it',     fontName='Helvetica-Bold', fontSize=10,  textColor=INK,      leading=13)
M_META   = S('m_meta',   fontName='Helvetica-Oblique', fontSize=8.5, textColor=INK_MUTED, leading=11)
M_TAG    = S('m_tag',    fontName='Helvetica',      fontSize=7.5, textColor=GREEN_DARK, leading=10)
M_BODY   = S('m_body',   fontName='Helvetica',      fontSize=9,   textColor=INK_SOFT, leading=11.8)
M_BUL    = S('m_bul',    fontName='Helvetica',      fontSize=9,   textColor=INK_SOFT, leading=11.8,
             leftIndent=5*mm, firstLineIndent=-3.5*mm)
M_LINK   = S('m_link',   fontName='Helvetica',      fontSize=8,   textColor=GREEN,    leading=11)
M_SUB    = S('m_sub',    fontName='Helvetica',      fontSize=9,   textColor=INK_MUTED, leading=12)

# Sidebar
SB_SEC   = S('sb_sec',   fontName='Helvetica-Bold', fontSize=9,   textColor=GREEN,    leading=12)
SB_IT    = S('sb_it',    fontName='Helvetica-Bold', fontSize=9,   textColor=INK,      leading=12)
SB_SUB   = S('sb_sub',   fontName='Helvetica-Oblique', fontSize=8, textColor=INK_MUTED, leading=11)
SB_BODY  = S('sb_body',  fontName='Helvetica',      fontSize=8.5, textColor=INK_SOFT, leading=11.5)
SB_CAT   = S('sb_cat',   fontName='Helvetica-Bold', fontSize=8.5, textColor=GREEN_DARK, leading=11)
SB_SKL   = S('sb_skl',   fontName='Helvetica',      fontSize=8.5, textColor=INK_SOFT, leading=11.5)

# ── Column renderer ───────────────────────────────────────────────────────────
class ColRenderer:
    """Track a y-cursor within a column and render flowables top-down."""

    def __init__(self, c, x, width, y_start, is_sidebar=False):
        self.c = c
        self.x = x
        self.width = width
        self.y = y_start
        self.is_sidebar = is_sidebar

    def draw(self, flowable, gap=0):
        _, h = flowable.wrapOn(self.c, self.width, 9999)
        flowable.drawOn(self.c, self.x, self.y - h)
        self.y -= h + gap

    def hr(self, gap_after=2*mm, color=RULE, thickness=0.4):
        line = HRFlowable(width=self.width, thickness=thickness, color=color,
                          spaceBefore=0, spaceAfter=0)
        _, h = line.wrapOn(self.c, self.width, 9999)
        line.drawOn(self.c, self.x, self.y - h)
        self.y -= h + gap_after

    def space(self, h):
        self.y -= h

    def section(self, label, top_gap=2.5*mm):
        """Section header: green label + hairline underline."""
        if top_gap:
            self.space(top_gap)
        style = SB_SEC if self.is_sidebar else M_SEC
        self.draw(Paragraph(label, style), 1.2 * mm)
        self.hr(2 * mm, color=GREEN, thickness=0.8)


# ── Page background ───────────────────────────────────────────────────────────
def draw_background(c):
    c.saveState()
    # Cream page background
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    # Forest-green accent bar on the far left
    c.setFillColor(GREEN)
    c.rect(0, 0, ACCENT_BAR_W, H, fill=1, stroke=0)
    c.restoreState()


# ── Build ─────────────────────────────────────────────────────────────────────
OUT = 'Michael_Go_CV.pdf'
c = pdfcanvas.Canvas(OUT, pagesize=A4)
draw_background(c)

# ── HEADER ────────────────────────────────────────────────────────────────────
y = H - MT

# Name
name_p = Paragraph('MICHAEL JOSEPH L. GO', H_NAME)
_, nh = name_p.wrapOn(c, AVAIL_W, 9999)
name_p.drawOn(c, ML, y - nh)
y -= nh + 1.5 * mm

# Title
title_p = Paragraph('Software Developer &amp; Data Scientist', H_TITLE)
_, th = title_p.wrapOn(c, AVAIL_W, 9999)
title_p.drawOn(c, ML, y - th)
y -= th + 2.5 * mm

# Contact line — using a bullet separator for a clean modern look
contact_html = (
    '+63 976 123 0768'
    '&nbsp;&nbsp;•&nbsp;&nbsp;'
    'michaeljgo33@gmail.com'
    '&nbsp;&nbsp;•&nbsp;&nbsp;'
    'Quezon City, Metro Manila'
    '&nbsp;&nbsp;•&nbsp;&nbsp;'
    '<font color="#0F7A3D">linkedin.com/in/michaeljgo</font>'
    '&nbsp;&nbsp;•&nbsp;&nbsp;'
    '<font color="#0F7A3D">github.com/mike-jgo</font>'
)
cont_p = Paragraph(contact_html, H_CONT)
_, ch = cont_p.wrapOn(c, AVAIL_W, 9999)
cont_p.drawOn(c, ML, y - ch)
y -= ch + 2.5 * mm

# Header rule — thin green underline
rule = HRFlowable(width=AVAIL_W, thickness=1.2, color=GREEN, spaceBefore=0, spaceAfter=0)
_, rh = rule.wrapOn(c, AVAIL_W, 9999)
rule.drawOn(c, ML, y - rh)
y -= rh + 3 * mm

BODY_TOP = y

# ── MAIN COLUMN ───────────────────────────────────────────────────────────────
mn = ColRenderer(c, MAIN_X, MAIN_W, BODY_TOP, is_sidebar=False)

# Summary
mn.draw(Paragraph('SUMMARY', M_SEC), 1.2 * mm)
mn.hr(2 * mm, color=GREEN, thickness=0.8)
mn.draw(Paragraph(
    'Final-year Computer Science student at De La Salle University, majoring in '
    'Software Technology and minoring in Data Science. I build full-stack web '
    'applications and data-driven pipelines using React, Vue 3, Node.js, Python, '
    'and cloud-integrated backends. Comfortable in Agile/Scrum environments and '
    'experienced shipping independent end-to-end projects.',
    M_BODY
), 1 * mm)

# Education
mn.section('EDUCATION')

education = [
    ('De La Salle University — Taft Campus', '2021 – Present',
     'BS Computer Science · Major in Software Technology · Minor in Data Science'),
    ('Xavier University Ateneo de Cagayan', 'Senior High School · 2019 – 2021',
     'STEM Strand'),
    ('Xavier University Ateneo de Cagayan', 'Junior High School · 2016 – 2019',
     None),
]

for title, sub, body in education:
    mn.draw(Paragraph(title, M_IT), 0.3 * mm)
    mn.draw(Paragraph(sub, M_META), 0.5 * mm)
    if body:
        mn.draw(Paragraph(body, M_BODY), 1.4 * mm)
    else:
        mn.space(1.4 * mm)

# Experience
mn.section('EXPERIENCE')

experience = [
    ('IT / Administrative Officer', '2021 – Present · Part-time',
     'Dr. Tayste Bud Corporation',
     [
         'Managed IT infrastructure and provided technical support across the organization.',
         'Handled administrative operations including documentation and internal coordination.',
     ]),
]

for title, sub, company, bullets in experience:
    mn.draw(Paragraph(title, M_IT), 0.3 * mm)
    mn.draw(Paragraph(f'{company} &nbsp;·&nbsp; <i>{sub}</i>', M_META), 0.5 * mm)
    for b in bullets:
        mn.draw(Paragraph(f'•&nbsp;&nbsp;{b}', M_BUL), 0.3 * mm)
    mn.space(1.4 * mm)

# Projects (top 3 on page 1)
projects = [
    {
        'title': 'Canvas Discord Bot',
        'date':  '2026',
        'tags':  'Python · Discord.py · Canvas API · APScheduler',
        'bullets': [
            'Automated Canvas LMS announcement and deadline syncing to a Discord server channel.',
            'Async task scheduling, message deduplication, and structured logging.',
        ],
    },
    {
        'title': 'Basket Grocery Tracker',
        'date':  '2026',
        'tags':  'React · TypeScript · Vite · Google Apps Script',
        'bullets': [
            'Full-stack grocery tracker with a TypeScript React frontend and serverless backend.',
            'Backed by Supabase for user auth and data storage; deployed to Vercel with CI/CD.',
        ],
        'link': 'github.com/mike-jgo/basket',
    },
    {
        'title': 'Fitlog Workout Tracker PWA',
        'date':  '2025',
        'tags':  'React · Vite · Supabase · Tailwind CSS · Recharts',
        'bullets': [
            'Full-stack PWA with user authentication, workout logging, and Recharts visualizations.',
            'Deployed to GitHub Pages; built with reusable React components and a Supabase backend.',
        ],
        'link': 'github.com/mike-jgo/gym-app',
    },
    {
        'title': 'Inventory System',
        'date':  '2025',
        'tags':  'Laravel · Vue 3 · Inertia.js · MySQL',
        'bullets': [
            'Full-stack inventory management system built with Laravel and Vue.js.',
            'Allows users to manage inventory items and track stock levels.',
        ],
    },
    {
        'title': 'Weather Prediction Dataset &amp; Analysis',
        'date':  '2024',
        'tags':  'Python · Selenium · Pandas · NumPy · Scikit-learn',
        'bullets': [
            'Scraped and cleaned historical Metro Manila weather data via Selenium WebDriver.',
            'Applied ML algorithms to forecast weather patterns; exported as structured CSV.',
        ],
    },
    {
        'title': 'Cold Storage Facility Showcase Website',
        'date':  '2023',
        'tags':  'Node.js · Express.js · Mocha',
        'bullets': [
            'Back-end developer and QA: built content management endpoints with Express.js.',
            'Designed an admin-editable system requiring no developer involvement to update.',
        ],
    },
]

def render_project(col, p):
    title_html = (
        f"{p['title']}"
        f"<font color='#7A8078' size='8'>&nbsp;&nbsp;·&nbsp;&nbsp;{p['date']}</font>"
    )
    col.draw(Paragraph(title_html, M_IT), 0.3 * mm)
    col.draw(Paragraph(p['tags'], M_TAG), 0.6 * mm)
    for b in p['bullets']:
        col.draw(Paragraph(f'•&nbsp;&nbsp;{b}', M_BUL), 0.3 * mm)
    if 'link' in p:
        col.draw(Paragraph(p['link'], M_LINK), 3 * mm)
    else:
        col.space(3 * mm)

mn.section('PROJECTS')
for p in projects[:3]:
    render_project(mn, p)

# ── SIDEBAR ───────────────────────────────────────────────────────────────────
sb = ColRenderer(c, SIDEBAR_X, SIDEBAR_W, BODY_TOP, is_sidebar=True)

# Skills
sb.draw(Paragraph('SKILLS', SB_SEC), 1.2 * mm)
sb.hr(2 * mm, color=GREEN, thickness=0.8)

skills = [
    ('Languages',    'Python, Java, JavaScript, TypeScript'),
    ('Front-End',    'React, Vue 3, Tailwind CSS, Vite'),
    ('Back-End',     'Node.js, Express.js, Laravel, Supabase'),
    ('Databases',    'MongoDB, MySQL'),
    ('Data Science', 'Pandas, NumPy, Scikit-learn, TensorFlow'),
    ('Testing / QA', 'Cypress, Mocha'),
    ('Tools',        'Git, Selenium, Discord.py, REST APIs'),
    ('Other',        'Agile/Scrum, UI/UX Design'),
]

for cat, items in skills:
    sb.draw(Paragraph(cat, SB_CAT), 0.3 * mm)
    sb.draw(Paragraph(items, SB_SKL), 1.6 * mm)

# Activities
sb.section('ACTIVITIES')

activities = [
    ('ASEAN Data Science Enablement Session', 'May 2023',
     'Participated in an ASEAN-led workshop on SAP Cloud for dataset analysis.'),
    ('Dept. of Communications, XU Student Government', 'Member · 2019 – 2020',
     'Created infographics and documentation for school communications.'),
    ('Media Information Technoculture Club', 'President · 2018 – 2019',
     'Organized tech events and workshops to promote technology among youth.'),
]

for title, sub, body in activities:
    sb.draw(Paragraph(title, SB_IT), 0.3 * mm)
    sb.draw(Paragraph(sub, SB_SUB), 0.6 * mm)
    sb.draw(Paragraph(body, SB_BODY), 2.5 * mm)

# ── PAGE 2 ────────────────────────────────────────────────────────────────────
c.showPage()
draw_background(c)

# Mini continuation header
y2 = H - MT
mini_p = Paragraph('MICHAEL JOSEPH L. GO', H_NAME_SMALL)
_, mh = mini_p.wrapOn(c, AVAIL_W, 9999)
mini_p.drawOn(c, ML, y2 - mh)
y2 -= mh + 2 * mm

rule2 = HRFlowable(width=AVAIL_W, thickness=1.2, color=GREEN, spaceBefore=0, spaceAfter=0)
_, rh2 = rule2.wrapOn(c, AVAIL_W, 9999)
rule2.drawOn(c, ML, y2 - rh2)
y2 -= rh2 + 4 * mm

# Full-width PROJECTS header
sec_p = Paragraph('PROJECTS', M_SEC)
_, sh = sec_p.wrapOn(c, AVAIL_W, 9999)
sec_p.drawOn(c, ML, y2 - sh)
y2 -= sh + 1.2 * mm
sec_rule = HRFlowable(width=AVAIL_W, thickness=0.8, color=GREEN, spaceBefore=0, spaceAfter=0)
_, srh = sec_rule.wrapOn(c, AVAIL_W, 9999)
sec_rule.drawOn(c, ML, y2 - srh)
y2 -= srh + 3 * mm

# Two-column project grid (remaining 3 projects)
P2_COL_W = (AVAIL_W - COL_GAP) / 2
left_col  = ColRenderer(c, ML, P2_COL_W, y2)
right_col = ColRenderer(c, ML + P2_COL_W + COL_GAP, P2_COL_W, y2)

for i, p in enumerate(projects[3:]):
    col = left_col if i % 2 == 0 else right_col
    render_project(col, p)

c.setTitle('Michael Joseph Go — CV')
c.setAuthor('Michael Joseph Go')
c.save()
print(f'Done: {OUT}')
