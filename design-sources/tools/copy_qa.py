"""Rewrite AI-sounding copy across case pages into plainer, first-person language."""
import sys

EDITS = {
    'case-foundry.html': [
        ('One system.<br><em>Two products. Zero guesswork.</em>', 'A design system<br><em>shared by two products.</em>'),
        ('I defined its tokens, rules and component decisions as text first, so designers, developers and AI agents work from the same source.',
         'I created it so both products could use the same tokens, components and rules. Everything is written down, so developers and the AI tools we use read the same guidelines I do.'),
        ('<strong>Rules first, AI-assisted</strong><p>Written specs and guardrails that people and AI coding agents both follow, with Figma as the visual reference.</p>',
         '<strong>Written rules + AI tools</strong><p>Specs that both developers and AI coding tools follow. Figma stays as the visual reference.</p>'),
        ('Two sibling products were drifting apart.', 'Two related products, built in two different ways.'),
        ('The goal was one system both products could inherit, without making them look identical.', 'I wanted one system both products could use, while each one kept its own brand.'),
        ('Same token names. Different values.', 'The same tokens, with a different brand on top.'),
        ('Four fixes that made the interface readable.', 'Fixing contrast in the tokens instead of screen by screen.'),
        ('The key move was splitting one brand color into two jobs:', 'The biggest change was splitting the brand color in two:'),
        ('Rules a team can apply without asking.', 'Rules written down, with examples.'),
        ('A system is only as good as the decisions people can make without a designer in the room. Every rule is written with a reason and a do/don’t, in the same documents developers and AI agents read.',
         'Most of the questions I got from developers were the same few questions, asked again and again. So I wrote each rule with the reason behind it and a do and don’t example, in the same documents developers and AI tools read.'),
        ('Design rulings, developers and AI agents.', 'How we keep it up to date.'),
        ('I ruled on every item and logged it, including saying no — the plan to move all CTAs to navy was rejected because it broke the contrast model.',
         'I reviewed every item, made a decision and wrote it down. Sometimes the answer was no: there was a plan to move all buttons to navy, and I rejected it because it broke the contrast rules.'),
        ('The specs double as instructions for AI coding agents: never invent a token, never duplicate a component, surface conflicts instead of resolving them silently. A token checker flags raw values before review.',
         'The same specs work as instructions for AI coding tools: don’t create new tokens, don’t duplicate components, and flag conflicts instead of guessing. A small script also checks for hardcoded values before code review.'),
        ('From a template to a system.', 'Where it started.'),
        ('Foundry is the second iteration: semantic tokens instead of raw colors, accessibility built into the values, and one source of truth for two products.',
         'Foundry is the second version. The main differences are semantic tokens instead of raw colors, contrast fixed in the values themselves, and one shared base for two products.'),
        ('Honest about the remaining work.', 'What’s still left to do.'),
        ('write the decision log from day one. Most developer questions were about decisions that existed only in conversation.',
         'start the decision log on day one. A lot of questions from developers were about decisions we had only talked about in a call.'),
    ],
    'case-certa.html': [
        ('Four roles. One certificate.<br><em>Zero spreadsheets in between.</em>', 'A certification platform<br><em>for agencies and the companies they certify.</em>'),
        ('Certification is a chain of hand-offs. Every gap was a manual step.', 'Getting certified meant a lot of emails, PDFs and spreadsheets.'),
        ('The brief asked for an admin panel. What the business needed was a single record that every role could move forward.',
         'The client asked for an admin panel. While mapping the flows, it became clear they needed one place where every role could see and update the same application.'),
        ('Four people touch one certificate. None of them need the same screen.', 'Four types of users, each with a different job.'),
        ('Moving a certificate forward<br><em>without losing the thread.</em>', 'From application<br><em>to certificate.</em>'),
        ('Sort by what is stuck, not by what is new.', 'Showing where each application is.'),
        ('“Unassigned” is a state, not a blank cell.', 'Rows without a supervisor say “Unassigned” instead of leaving the cell empty.'),
        ('Review in context, decide in one place.', 'Reviewing an application without leaving the list.'),
        ('surfaces problems first — like ingredients without a supplier certificate.', 'shows problems first, like ingredients without a supplier certificate.'),
        ('so incomplete is never confused with denied.', 'so an incomplete application doesn’t look like a rejected one.'),
        ('Let each agency write its own inspection, safely.', 'Letting each agency build its own inspection checklist.'),
        ('Plan visits around people, not just dates.', 'Planning visits with each supervisor’s workload in view.'),
        ('with a suggestion instead of an error.', 'and the screen suggests a fix.'),
        ('The person paying should never have to email to ask “where are we?”.', 'A portal for the company getting certified.'),
        ('turning a support channel into self-service.', 'so fewer status questions reach the agency.'),
        ('A brand and a UI system that read as trustworthy.', 'The brand and the UI system.'),
        ('Invites, not sign-ups.', 'Users are invited.'),
        ('Every destructive action explains itself.', 'Destructive actions need a reason.'),
        ('Permissions are visible, not hidden.', 'Permission limits are explained.'),
        ('A complete product model, ready to build.', 'Where it ended up.'),
        ('Scoped permissions instead of yes/no', 'Permissions with scope, like “own company” or “assigned visits”'),
    ],
    'case-relay.html': [
        ('One order. Four teams.<br><em>Nobody loses the thread.</em>', 'How a staffing order moves<br><em>between companies, MSPs and agencies.</em>'),
        ('A staffing order is a promise that passes through many hands.', 'One order goes through a lot of people.'),
        ('My job was to turn those questions into visible rules, so the order explains itself at every step.', 'My work was to answer those questions with clear rules and show them on screen.'),
        ('Making a promise visible<br><em>from request to fill.</em>', 'Decisions about the order,<br><em>from request to fill.</em>'),
        ('Make the deadline clear without turning the grid red.', 'Showing urgency without a wall of red cards.'),
        ('so the most important work is at the top without shouting.', 'so the most urgent work is always at the top.'),
        ('Keep every order. Classify what happened.', 'Replacing “Deleted” with real outcomes.'),
        ('Reporting finally separates performance from data-entry noise.', 'Reports can now tell a hard-to-fill order apart from a data-entry mistake.'),
        ('One accountable owner, many helpers.', 'Making it clear who owns each order.'),
        ('Same order, two truths.', 'What the client sees, and what stays internal.'),
        ('Internal data is excluded by role at the model level, not hidden with CSS, and the interface says what is private.',
         'Internal data is removed for the client role in the data itself, and the screen tells MSP users what the client can’t see.'),
        ('Clients get clarity without exposing how the MSP runs its network.', 'Clients see their progress without seeing how the MSP works with its agencies.'),
        ('Design doesn’t end at the screen', 'User training'),
        ('Teaching the workflow before the buttons.', 'Training new users on the whole workflow.'),
        ('gave status and role badges colors that never collide.', 'gave status and role badges different colors so they don’t get confused.'),
    ],
    'case-meralis.html': [
        ('Nine roles. One employee record.<br><em>Everyone sees only what is theirs.</em>', 'HR and payroll for nine roles<br><em>that share one employee record.</em>'),
        ('Scope follows the assignment, not the screen.', 'Access depends on the person’s assignments.'),
        ('I mapped nine roles — from HR Admin and Payroll Manager to HR Rep, Safety Coordinator, HR Proxy, Site and Department Manager — against what they may see and approve for each request type.',
         'I mapped nine roles, from HR Admin and Payroll Manager to HR Rep, Safety Coordinator, HR Proxy, Site Manager and Department Manager, against what each one can see and approve for every request type.'),
        ('Three queues became one inbox.', 'Bringing three approval queues together.'),
        ('A missing tab means “not yours to review” — the interface never suggests work you can’t do.', 'A missing tab means “not yours to review”, so nobody sees work they can’t act on.'),
        ('A shared language for the product—and the team building it.', 'Shared foundations for the product and the team building it.'),
    ],
    'case-spark.html': [
        ('Talk to real people about real jobs.<br><em>Then try one out.</em>', 'Helping high school students<br><em>explore careers with real mentors.</em>'),
        ('A platform for teenagers that felt like paperwork.', 'A product for teenagers that felt too formal.'),
        ('The design had to balance two things: delight for 16-year-olds and clear, safe structure for schools.', 'It had to feel fun for 16-year-olds and still be clear and safe enough for schools to approve.'),
        ('02 / Three seats, one goal', '02 / Three roles'),
        ('Every role gets its own front door.', 'Each role has its own experience.'),
        ('Making curiosity easy<br><em>and safe.</em>', 'Four decisions<br><em>for students and teachers.</em>'),
        ('01 / Start with people, not job titles', '01 / Mentor cards'),
        ('Lead with a face and a sentence.', 'Starting with people instead of job titles.'),
        ('A rotating “mentor of the day” keeps the page alive.', 'A rotating “mentor of the day” shows students someone new each visit.'),
        ('Discovery becomes a conversation starter instead of a directory.', 'Students find someone to talk to, and the first message is one click away.'),
        ('02 / Lower the courage it takes to ask', '02 / Messages'),
        ('03 / Turn questions into a signal for teachers', '03 / Teacher dashboard'),
        ('Curiosity as data', 'What students search and ask'),
        ('04 / From talking to trying', '04 / Opportunities'),
        ('Make the next step something you can do.', 'Giving students a next step after the chat.'),
        ('Curiosity turns into experience while the interest is still fresh.', 'Students can go from a conversation to an application in the same session.'),
        ('A free trial that brings the whole school.', 'Free trials designed around how schools buy.'),
        ('Each step gives value and collects something useful in return.', 'Each step gives the teacher more time and gives the team feedback or a new contact.'),
        ('A product that looks like who it’s for.', 'Where it ended up.'),
    ],
    'index.html': [
        ('<p>From application<br><em>to certified seal.</em></p>', '<p>Applications, inspections<br><em>and certificates.</em></p>'),
        ('A certification platform for food and ingredient agencies. Applications, inspections, field visits and certificates in one record that four different roles move forward.',
         'A certification platform for food and ingredient agencies, covering applications, inspections, field visits and certificates for four types of users.'),
        ('One token-based system shared by two B2B products: 177 shared tokens, WCAG fixes at the source and rules that developers and AI agents follow.',
         'The design system I created for two B2B products: 177 shared tokens, accessible colors and written rules that developers and AI tools follow.'),
    ],
    'case-wattlepay.html': [
        ('Don’t take my word for it. Try it.', 'Try the prototype.'),
    ],
}

missing = 0
for fname, edits in EDITS.items():
    path = f'pf/{fname}'
    s = open(path).read()
    for old, new in edits:
        if old not in s:
            print('MISSING', fname, '::', old[:70])
            missing += 1
            continue
        s = s.replace(old, new)
    open(path, 'w').write(s)
print('done, missing:', missing)
sys.exit(1 if missing else 0)
