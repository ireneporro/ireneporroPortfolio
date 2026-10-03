import re
s = open('pf/case-relay.html').read()
head = s[:s.index('<main id="main">')]
head = head.replace('Relay Case Study — B2B Staffing Marketplace', 'Spark Case Study — Career Discovery for High Schools').replace('relay-case.css', 'spark-case.css').replace('class="relay"', 'class="spark"')
head = re.sub(r'<meta name="description"[^>]*>', '<meta name="description" content="How Irene Porro redesigned a career-discovery platform that connects high school students with mentors, teachers and real opportunities." />', head)
head = re.sub(r'<nav aria-label="Case study">.*?</nav>', '<nav aria-label="Case study"><a href="#context">Context</a><a href="#roles">Roles</a><a href="#decisions">Decisions</a><a href="#growth">Growth</a></nav>', head)
head = head.replace('</head>', '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet" />\n</head>', 1)


def fig(img, alt, cap, laptop=False):
    if laptop:
        return (f'<div class="hero-showcase wrap"><figure class="device-figure"><div class="laptop-stage"><a class="screen-zoom case-laptop-screen" href="./assets/spark/{img}.webp" data-zoom aria-label="Enlarge: {alt}">'
                f'<img src="./assets/spark/{img}.webp" alt="{alt}" width="2880" height="1800" decoding="async" fetchpriority="high" /></a><div class="case-laptop-base" aria-hidden="true"></div></div>'
                f'<figcaption><span>{cap}</span><a href="./assets/spark/{img}.webp" data-zoom data-alt="{alt}">Enlarge screen ↗</a></figcaption></figure></div>')
    return (f'<figure class="screen-figure"><div class="screen-stage"><a class="screen-zoom" href="./assets/spark/{img}.webp" data-zoom aria-label="Enlarge: {alt}">'
            f'<img src="./assets/spark/{img}.webp" alt="{alt}" loading="lazy" decoding="async" width="2880" height="1800" /></a></div>'
            f'<figcaption><span>{cap}</span><a href="./assets/spark/{img}.webp" data-zoom data-alt="{alt}">Enlarge screen ↗</a></figcaption></figure>')


def dec(n, t, intro, d, g, w, img, alt, cap, rev=False, label='Why it matters'):
    return (f'<section class="decision{" decision-reverse" if rev else ""} wrap"><div class="decision-copy"><span class="decision-index">{n}</span><h2>{t}</h2><p>{intro}</p>'
            f'<dl><div><dt>The decision</dt><dd>{d}</dd></div><div><dt>The guardrail</dt><dd>{g}</dd></div><div><dt>{label}</dt><dd>{w}</dd></div></dl></div>{fig(img, alt, cap)}</section>')


body = '\n'.join([
    '''<main id="main">
<section class="meralis-intro wrap" id="overview">
  <div class="intro-meta"><span class="brand spark-brand"><b>✦</b>Spark</span><span>EdTech / Career discovery for high schools</span></div>
  <p class="eyebrow">UX/UI design · Multi-role product · Visual identity · Growth model</p>
  <h1>Talk to real people about real jobs.<br><em>Then try one out.</em></h1>
  <div class="intro-bottom"><p>Spark connects high school students with professionals who mentor them, with teachers who guide them and with internships they can actually apply to. I redesigned the product end to end, from roles and flows to a brand that feels young and optimistic.</p><a class="primary-link" href="#decisions">Explore the decisions ↓</a></div>
</section>''',
    fig('explore', 'Student explore view with mentors of the day and career filters', 'Explore · Mentors of the day', True),
    '''<section class="project-facts wrap" aria-label="Project summary">
  <div><span>My role</span><strong>Sole UX/UI Designer</strong><p>Research, information architecture, flows, interface, visual direction and handoff, at a low-code product agency.</p></div>
  <div><span>Users</span><strong>3 roles · invite-only</strong><p>Students, teachers and mentors. Students join through their high school; nobody signs up on their own.</p></div>
  <div><span>Outcome</span><strong>Shipped to production</strong><p>Built on a low-code stack and released after validation with schools.</p></div>
</section>
<p class="disclosure wrap">Spark is an anonymized identity for client work. Screens are redesigned portfolio reconstructions based on my original files, with illustrative people, schools and organizations.</p>''',
    '''<section class="chapter wrap" id="context"><div class="chapter-heading"><p class="eyebrow">01 / The problem behind the brief</p><h2>A platform for teenagers that felt like paperwork.</h2></div><div class="chapter-copy"><p>The first version worked, but it was hard to read and harder to trust. Students, teachers and mentors saw similar screens, so nobody knew what was meant for them.</p><p>The founder’s brief was simple: make it feel young, colorful and hopeful, and make it obvious what each person should do next.</p><p><strong>The design had to balance two things: delight for 16-year-olds and clear, safe structure for schools.</strong></p></div></section>''',
    '''<section class="chapter wrap" id="roles"><div class="chapter-heading"><p class="eyebrow">02 / Three seats, one goal</p><h2>Every role gets its own front door.</h2></div><div class="chapter-copy"><p>Access starts with a school code, so every student arrives through an adult who is responsible for them. From there, each role sees only what it needs.</p></div></section>
<div class="wrap spark-roles">
  <article><i>🎒</i><span>Students</span><h3>Explore and ask</h3><p>Browse mentors, chat, save people and opportunities, and try careers through shadowing and internships.</p></article>
  <article><i>🍎</i><span>Teachers &amp; counselors</span><h3>Guide the class</h3><p>Invite students, see what they are curious about and preview the student experience in a safe demo mode.</p></article>
  <article><i>💼</i><span>Mentors</span><h3>Share their story</h3><p>Real professionals who answer questions and post opportunities from their organizations.</p></article>
</div>''',
    '<div class="wrap">' + fig('onboard', 'Onboarding: choose student, teacher or mentor and enter a school code', 'Onboarding · Invite-only through a school code') + '</div>',
    '<section class="decisions-heading wrap" id="decisions"><p class="eyebrow">03 / Decisions that shaped the experience</p><h2>Making curiosity easy<br><em>and safe.</em></h2><p>Four decisions across the student and teacher experience.</p></section>',
    dec('01 / Start with people, not job titles', 'Lead with a face and a sentence.', 'Teenagers don’t search for “operations management”. They respond to a person who tells them what their day is like.', 'Mentor cards open with a first-person sentence, a career path and topic tags, with “Message” as the main action.', 'Filters use plain-language industries with icons, never internal taxonomy. A rotating “mentor of the day” keeps the page alive.', 'Discovery becomes a conversation starter instead of a directory.', 'explore', 'Mentor cards with first-person quotes', 'Explore · People first', label='The intended effect'),
    dec('02 / Lower the courage it takes to ask', 'Help students ask the first question.', 'The hardest part of messaging a professional is knowing what to say. Many conversations never started.', 'Suggested questions sit right above the composer, and the mentor’s path and reply time are visible next to the chat.', 'Students only message verified mentors in their school’s network; teachers can see what is being asked across the class.', 'Questions become easier to send, and safer for the school to allow.', 'messages', 'Chat with a mentor, suggested questions and mentor profile', 'Messages · Suggested questions and context', rev=True),
    dec('03 / Turn questions into a signal for teachers', 'Show teachers what their students are curious about.', 'Counselors had no way to see what students were exploring, so career guidance stayed generic.', 'A dashboard summarizes searches, top careers and industries, and the actual questions students ask mentors.', 'Teachers see aggregate interest and questions, and can preview the student view in a non-actionable demo mode.', 'Guidance can start from what each class already cares about.', 'teacher', 'Teacher dashboard with searches, top careers, industries and student questions', 'Teacher dashboard · Curiosity as data'),
    dec('04 / From talking to trying', 'Make the next step something you can do.', 'Talking to a mentor is the start. Students needed somewhere to go next.', 'An opportunities feed of shadowing days, internships and apprenticeships, filterable by type and distance, with save and apply.', 'Every card states who it is for, when to apply and whether it is paid or earns school credit, before the student clicks.', 'Curiosity turns into experience while the interest is still fresh.', 'opps', 'Opportunities feed with shadowing, internships and apprenticeships', 'Opportunities · Try a career before choosing it', rev=True),
    '''<section class="chapter wrap" id="growth"><div class="chapter-heading"><p class="eyebrow">04 / Growth model</p><h2>A free trial that brings the whole school.</h2></div><div class="chapter-copy"><p>Schools buy software slowly. Teachers needed time to prove value before a principal or district would pay.</p><p>I designed a three-step trial: 14 days free, a second period unlocked by a short survey, a third unlocked by inviting another teacher, then a request link to share with the school. Each step gives value and collects something useful in return.</p><p><strong>Locked never means stuck:</strong> the last screen always offers the next action, not a dead end.</p></div></section>''',
    '<div class="wrap">' + fig('trials', 'Three free trials and premium, unlocked by survey, referral and school request', 'School plan · Trial ladder and school request') + '</div>',
    '''<section class="chapter wrap" id="outcomes"><div class="chapter-heading"><p class="eyebrow">05 / Where it landed</p><h2>A product that looks like who it’s for.</h2></div><div class="chapter-copy"><p>I delivered the full product design: role model, onboarding, student, teacher and mentor experiences, the trial and premium flows, and a warm gradient identity built on coral, pink and a sunny accent.</p><p>The product shipped on a low-code stack; I left the agency during validation, so I don’t have post-launch metrics to report.</p><p><strong>What I would do earlier:</strong> test question prompts with real students in the first week. Small copy changes in the chat had more impact on engagement than any layout change.</p></div></section>
<footer class="case-footer wrap"><div><span>Building for a young audience?</span><h2>Let’s talk.</h2></div><a class="primary-link" href="./index.html#contact">Contact Irene ↗</a><a href="./more-work.html">← Back to more work</a></footer>
</main><dialog class="image-dialog" aria-label="Enlarged product screenshot"><form method="dialog"><button aria-label="Close">Close ×</button></form><img alt="" /><p></p></dialog><script src="./meralis-case.js"></script></body></html>
''',
])
open('pf/case-spark.html', 'w').write(head + body)
print('ok')
