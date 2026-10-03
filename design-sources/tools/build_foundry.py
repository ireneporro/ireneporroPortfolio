import re
H = {'themes': 1610, 'tokens': 1318, 'scales': 1130, 'contrast': 1114, 'rules': 1416, 'process': 1298}
s = open('pf/case-relay.html').read()
head = s[:s.index('<main id="main">')]
head = head.replace('Relay Case Study — B2B Staffing Marketplace', 'Foundry Design System — One System, Two Products').replace('relay-case.css', 'foundry-case.css').replace('class="relay"', 'class="foundry"')
head = re.sub(r'<meta name="description"[^>]*>', '<meta name="description" content="How Irene Porro built a token-based design system shared by two B2B products, with WCAG fixes, documented rules and an AI-assisted maintenance workflow." />', head)
head = re.sub(r'<nav aria-label="Case study">.*?</nav>', '<nav aria-label="Case study"><a href="#context">Context</a><a href="#themes">Two brands</a><a href="#a11y">Accessibility</a><a href="#rules">Rules</a><a href="#process">Process</a></nav>', head)


def fig(img, alt, cap):
    return (f'<figure class="screen-figure"><div class="screen-stage"><a class="screen-zoom" href="./assets/foundry/{img}.webp" data-zoom aria-label="Enlarge: {alt}">'
            f'<img src="./assets/foundry/{img}.webp" alt="{alt}" loading="lazy" decoding="async" width="2880" height="{H[img]}" /></a></div>'
            f'<figcaption><span>{cap}</span><a href="./assets/foundry/{img}.webp" data-zoom data-alt="{alt}">Enlarge ↗</a></figcaption></figure>')


def ch(id, n, t, body):
    return f'<section class="chapter wrap" id="{id}"><div class="chapter-heading"><p class="eyebrow">{n}</p><h2>{t}</h2></div><div class="chapter-copy">{body}</div></section>'


def w(x, extra=''):
    return f'<div class="wrap"{extra}>{x}</div>'


parts = [
    '''<main id="main">
<section class="meralis-intro wrap" id="overview">
  <div class="intro-meta"><span class="brand foundry-brand"><b></b>Foundry</span><span>Design system / Shared by two B2B products</span></div>
  <p class="eyebrow">Design systems · Accessibility · Design ops · AI-assisted workflow</p>
  <h1>One system.<br><em>Two products. Zero guesswork.</em></h1>
  <div class="intro-bottom"><p>Foundry is the design system behind <a href="./case-meralis.html">Meralis</a> and <a href="./case-relay.html">Relay</a>. I defined its tokens, rules and component decisions as text first, so designers, developers and AI agents work from the same source.</p><a class="primary-link" href="#themes">See the system ↓</a></div>
</section>''',
    w(fig("themes", "The same components rendered in Relay teal and Meralis purple", "Same tokens, same components, two brands")),
    '''<section class="project-facts wrap" aria-label="Project summary">
  <div><span>My role</span><strong>Design system owner</strong><p>Token values, guidelines, component rulings and documentation. Two front-end developers implemented it in code.</p></div>
  <div><span>Scale</span><strong>2 products · 47 components</strong><p>193 semantic tokens, 177 of them shared. 16 logged decisions, 17 spec documents.</p></div>
  <div><span>Method</span><strong>Rules first, AI-assisted</strong><p>Written specs and guardrails that people and AI coding agents both follow, with Figma as the visual reference.</p></div>
</section>
<p class="disclosure wrap">Foundry is an anonymized name for the design system of two live products at my current company. Boards are portfolio reconstructions using the real token values and rules.</p>''',
    ch("context", "01 / The problem", "Two sibling products were drifting apart.",
       "<p>The HR product and the staffing marketplace share modules like time off, payroll and roles, but they were built with different component libraries, hardcoded colors and their own spacing.</p><p>The marketplace’s bright brand color was used for buttons and text, where white text reached only 2.6:1. Borders and focus rings were almost invisible.</p><p><strong>The goal was one system both products could inherit, without making them look identical.</strong></p>"),
    ch("themes", "02 / One system, two brands", "Same token names. Different values.",
       "<p>Both products use the same semantic tokens and components. A thin adapter layer maps each product’s brand palette onto those names, so a button is always <code>--brand-cta</code>, whether it renders teal or purple.</p><p>Spacing, radius, type, density, motion, focus and borders are shared outright. Only brand, neutrals and a few data-visualization accents are themed.</p>"),
    w(fig("tokens", "Token table comparing shared and themed values, with 92% of names shared", "177 of 193 tokens are shared across both products")),
    w(fig("scales", "Spacing, type, radius and row-height scales", "Foundations every screen inherits"), ' style="margin-top:30px"'),
    ch("a11y", "03 / Accessibility", "Four fixes that made the interface readable.",
       "<p>I audited contrast against WCAG 2.2 AA and fixed the system at the token level, so every screen improved at once instead of page by page.</p><p>The key move was splitting one brand color into two jobs: a bright identity shade for logos and decoration, and a darker interaction shade for anything that carries text.</p>"),
    w(fig("contrast", "Before and after contrast for CTA text, input borders, focus ring and placeholder", "Before / after, plus the migration in the HR product")),
    ch("rules", "04 / Rules", "Rules a team can apply without asking.",
       "<p>A system is only as good as the decisions people can make without a designer in the room. Every rule is written with a reason and a do/don’t, in the same documents developers and AI agents read.</p>"),
    w(fig("rules", "Six do and don't rules: CTA color, labels, role badges, nested radius, tokens and status shape", "Do · Don’t")),
    ch("process", "05 / Maintaining it", "Design rulings, developers and AI agents.",
       "<p>After each implementation wave, developers sent a deviation memo: where the code differed from the spec, and what they needed decided. I ruled on every item and logged it, including saying no — the plan to move all CTAs to navy was rejected because it broke the contrast model.</p><p>The specs double as instructions for AI coding agents: never invent a token, never duplicate a component, surface conflicts instead of resolving them silently. A token checker flags raw values before review.</p>"),
    w(fig("process", "Deviation memo with design rulings, process steps and a token checker", "Deviation memo, decision log and token checks")),
    ch("origins", "06 / Where it started", "From a template to a system.",
       "<p>The first version grew out of an e-commerce template and a set of static component specs. <a href='./case-design-system.html'>Design System 1.0</a> documents that starting point: foundations, components and states for a single product.</p><p>Foundry is the second iteration: semantic tokens instead of raw colors, accessibility built into the values, and one source of truth for two products.</p>"),
    ch("next", "07 / What’s next", "Honest about the remaining work.",
       "<p>Component adoption is well ahead of token adoption: the HR product still carries thousands of raw color values from before the system. The next steps are a single shared package for both products, a synced Figma library, and turning the dark-mode and tenant-theme hooks that already exist into shipped features.</p><p><strong>What I would do earlier:</strong> write the decision log from day one. Most developer questions were about decisions that existed only in conversation.</p>"),
    '''<footer class="case-footer wrap"><div><span>Need a system more than one product can share?</span><h2>Let’s talk.</h2></div><a class="primary-link" href="./index.html#contact">Contact Irene ↗</a><a href="./index.html#work">← Back to selected work</a></footer>
</main><dialog class="image-dialog" aria-label="Enlarged board"><form method="dialog"><button aria-label="Close">Close ×</button></form><img alt="" /><p></p></dialog><script src="./meralis-case.js"></script></body></html>
''',
]
open('pf/case-foundry.html', 'w').write(head + '\n'.join(parts))
print('ok')
