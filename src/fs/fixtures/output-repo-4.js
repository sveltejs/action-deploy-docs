export default {
	name: "repo-4",
	is_dir: true,
	content: [
		{ name: "README.md", is_dir: false, content: "" },
		{
			name: "sites",
			is_dir: true,
			content: [
				{
					name: "content",
					is_dir: true,
					content: [
						{
							name: "blog",
							is_dir: true,
							content: [
								{
									name: "2016-11-26-frameworks-without-the-framework.md",
									is_dir: false,
									content:
										"---\ntitle: \"Frameworks without the framework: why didn't we think of this sooner?\"\ndescription: You can't write serious applications in vanilla JavaScript without hitting a complexity wall. But a compiler can do it for you.\nauthor: Rich Harris\nauthorURL: https://twitter.com/Rich_Harris\n---\n\n> Wait, this new framework has a *runtime*? Ugh. Thanks, I'll pass.\n> **– front end developers in 2018**\n\nWe're shipping too much code to our users. Like a lot of front end developers, I've been in denial about that fact, thinking that it was fine to serve 100kb of JavaScript on page load – just use [one less .jpg!](https://twitter.com/miketaylr/status/227056824275333120) – and that what *really* mattered was performance once your app was already interactive.\n\nBut I was wrong. 100kb of .js isn't equivalent to 100kb of .jpg. It's not just the network time that'll kill your app's startup performance, but the time spent parsing and evaluating your script, during which time the browser becomes completely unresponsive. On mobile, those milliseconds rack up very quickly.\n\nIf you're not convinced that this is a problem, follow [Alex Russell](https://twitter.com/slightlylate) on Twitter. Alex [hasn't been making many friends in the framework community lately](https://twitter.com/slightlylate/status/728355959022587905), but he's not wrong. But the proposed alternative to using frameworks like Angular, React and Ember – [Polymer](https://www.polymer-project.org/1.0/) – hasn't yet gained traction in the front end world, and it's certainly not for a lack of marketing.\n\nPerhaps we need to rethink the whole thing.\n\n\n## What problem do frameworks *really* solve?\n\nThe common view is that frameworks make it easier to manage the complexity of your code: the framework abstracts away all the fussy implementation details with techniques like virtual DOM diffing. But that's not really true. At best, frameworks *move the complexity around*, away from code that you had to write and into code you didn't.\n\nInstead, the reason that ideas like React are so wildly and deservedly successful is that they make it easier to manage the complexity of your *concepts*. Frameworks are primarily a tool for structuring your thoughts, not your code.\n\nGiven that, what if the framework *didn't actually run in the browser*? What if, instead, it converted your application into pure vanilla JavaScript, just like Babel converts ES2016+ to ES5? You'd pay no upfront cost of shipping a hefty runtime, and your app would get seriously fast, because there'd be no layers of abstraction between your app and the browser.\n\n\n## Introducing Svelte\n\nSvelte is a new framework that does exactly that. You write your components using HTML, CSS and JavaScript (plus a few extra bits you can [learn in under 5 minutes](https://v2.svelte.dev/guide)), and during your build process Svelte compiles them into tiny standalone JavaScript modules. By statically analysing the component template, we can make sure that the browser does as little work as possible.\n\nThe [Svelte implementation of TodoMVC](https://svelte-todomvc.surge.sh/) weighs 3.6kb zipped. For comparison, React plus ReactDOM *without any app code* weighs about 45kb zipped. It takes about 10x as long for the browser just to evaluate React as it does for Svelte to be up and running with an interactive TodoMVC.\n\nAnd once your app *is* up and running, according to [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark) **Svelte is fast as heck**. It's faster than React. It's faster than Vue. It's faster than Angular, or Ember, or Ractive, or Preact, or Riot, or Mithril. It's competitive with Inferno, which is probably the fastest UI framework in the world, for now, because [Dominic Gannaway](https://twitter.com/trueadm) is a wizard. (Svelte is slower at removing elements. We're [working on it](https://github.com/sveltejs/svelte/issues/26).)\n\nIt's basically as fast as vanilla JS, which makes sense because it *is* vanilla JS – just vanilla JS that you didn't have to write.\n\n\n## But that's not the important thing\n\nWell, it *is* important – performance matters a great deal. What's really exciting about this approach, though, is that we can finally solve some of the thorniest problems in web development.\n\nConsider interoperability. Want to `npm install cool-calendar-widget` and use it in your app? Previously, you could only do that if you were already using (a correct version of) the framework that the widget was designed for – if `cool-calendar-widget` was built in React and you're using Angular then, well, hard cheese. But if the widget author used Svelte, apps that use it can be built using whatever technology you like. (On the TODO list: a way to convert Svelte components into web components.)\n\nOr [code splitting](https://twitter.com/samccone/status/797528710085652480). It's a great idea (only load the code the user needs for the initial view, then get the rest later), but there's a problem – even if you only initially serve one React component instead of 100, *you still have to serve React itself*. With Svelte, code splitting can be much more effective, because the framework is embedded in the component, and the component is tiny.\n\nFinally, something I've wrestled with a great deal as an open source maintainer: your users always want *their* features prioritised, and underestimate the cost of those features to people who don't need them. A framework author must always balance the long-term health of the project with the desire to meet their users' needs. That's incredibly difficult, because it's hard to anticipate – much less articulate – the consequences of incremental bloat, and it takes serious soft skills to tell people (who may have been enthusiastically evangelising your tool up to that point) that their feature isn't important enough. But with an approach like Svelte's, many features can be added with absolutely no cost to people who don't use them, because the code that implements those features just doesn't get generated by the compiler if it's unnecessary.\n\n\n## We're just getting started\n\nSvelte is very new. There's a lot of work still left to do – creating build tool integrations, adding a server-side renderer, hot reloading, transitions, more documentation and examples, starter kits, and so on.\n\nBut you can already build rich components with it, which is why we've gone straight to a stable 1.0.0 release. [Read the guide](https://v2.svelte.dev/guide), [try it out in the REPL](/repl), and head over to [GitHub](https://github.com/sveltejs/svelte) to help kickstart the next era of front end development.\n",
								},
								{
									name: "2017-08-07-the-easiest-way-to-get-started.md",
									is_dir: false,
									content:
										"---\ntitle: The easiest way to get started with Svelte\ndescription: This'll only take a minute.\nauthor: Rich Harris\nauthorURL: https://twitter.com/Rich_Harris\n---\n\nSvelte is a [new kind of framework](/blog/frameworks-without-the-framework). Rather than putting a `<script src='svelte.js'>` tag on the page, or bringing it into your app with `import` or `require`, Svelte is a compiler that works behind the scenes to turn your component files into beautifully optimised JavaScript.\n\nBecause of that, getting started with it can be a little bit confusing at first. How, you might reasonably ask, do you make a Svelte app?\n\n\n## 1. Use the REPL\n\nThe [Svelte REPL](repl) is the easiest way to begin. You can choose from a list of examples to get you started, and tweak them until they do what you want.\n\n<aside><p>You'll need to have <a href=\"https://nodejs.org/\">Node.js</a> installed, and know how to use the terminal</p></aside>\n\nAt some point, your app will outgrow the REPL. Click the **download** button to save a `svelte-app.zip` file to your computer and uncompress it.\n\nOpen a terminal window and set the project up...\n\n```bash\ncd /path/to/svelte-app\nnpm install\n```\n\n...then start up a development server:\n\n```bash\nnpm run dev\n```\n\nThis will serve your app on [localhost:5000](http://localhost:5000) and rebuild it with [Rollup](https://rollupjs.org) every time you make a change to the files in `svelte-app/src`.\n\n\n## 2. Use degit\n\nWhen you download from the REPL, you're getting a customised version of the [sveltejs/template](https://github.com/sveltejs/template) repo. You can skip messing around with zip files by using [degit](https://github.com/Rich-Harris/degit), a project scaffolding tool.\n\nIn the terminal, you can instantly create a new project like so:\n\n```bash\nnpx degit sveltejs/template my-svelte-project\ncd my-svelte-project\nnpm install\nnpm run dev\n```\n\nThis will create a new project in the `my-svelte-project` directory, install its dependencies, and start a server on http://localhost:5000.\n\nOnce you've tinkered a bit and understood how everything fits together, you can fork [sveltejs/template](https://github.com/sveltejs/template) and start doing this instead:\n\n```bash\nnpx degit your-name/template my-new-project\n```\n\nAnd that's it! Do `npm run build` to create a production-ready version of your app, and check the project template's [README](https://github.com/sveltejs/template/blob/master/README.md) for instructions on how to easily deploy your app to the web with [Now](https://zeit.co/now) or [Surge](http://surge.sh/).\n\nYou're not restricted to using Rollup — there are also integrations for [webpack](https://github.com/sveltejs/svelte-loader), [Browserify](https://github.com/tehshrike/sveltify) and others, or you can use the [Svelte CLI](https://github.com/sveltejs/svelte-cli) (Update from 2019: with Svelte 3 the CLI was deprecated and we now use [sirv-cli](https://www.npmjs.com/package/sirv-cli) in our template. Feel free to use whatever tool you like!) or the [API](https://github.com/sveltejs/svelte/tree/v2#api) directly. If you make a project template using one of these tools, please share it with the [Svelte Discord chatroom](chat), or via [@sveltejs](https://twitter.com/sveltejs) on Twitter!\n",
								},
								{
									name: "2017-09-06-the-zen-of-just-writing-css.md",
									is_dir: false,
									content:
										"---\ntitle: The zen of Just Writing CSS\ndescription: I would say this is the future, but we're already doing it.\nauthor: Rich Harris\nauthorURL: https://twitter.com/Rich_Harris\n---\n\nIt's fashionable to dislike CSS. There are lots of reasons why that's the case, but it boils down to this: CSS is *unpredictable*. If you've never had the experience of tweaking a style rule and accidentally breaking some layout that you thought was completely unrelated — usually when you're trying to ship — then you're either new at this or you're a much better programmer than the rest of us.\n\nSo the JavaScript community rolled up its sleeves and got to work. Over the last couple of years, there's been a Cambrian explosion of libraries aimed at making CSS behave, collectively referred to as *CSS-in-JS*.\n\nWhat you might not realise is that **the biggest problems with CSS can be solved without CSS-in-JS**. Without those problems, writing CSS isn't just tolerable — it's enjoyable. And you don't have to find solutions to the additional problems that CSS-in-JS introduces.\n\nThis article isn't in any way intended as criticism of the hard work the CSS-in-JS community has done. It's one of the most active corners of the JS ecosystem, and new ideas are springing up every week. Instead, my purpose is to illustrate why an alternative approach — based on Single File Components with real CSS — is so damn delightful.\n\n\n## The biggest problem with CSS\n\nEverything in CSS is global. Because of that, styles intended for one bit of markup often end up affecting another. Because of *that*, developers often resort to wild namespacing conventions (not 'rules', since they're very difficult to enforce) that mostly just increase your risk of RSI.\n\nIt gets worse when you're working on a team. No-one dares touch styles authored by someone else, because it's often unclear what they're doing, what markup they apply to, and what disasters will unfold if you remove them.\n\nThe consequence of all this is the **append-only stylesheet**. There's no way of knowing which code can safely be removed, so it's common to undo some existing style with another, more specific style — even on relatively small projects.\n\n\n## Single File Components change all that\n\nThe idea behind SFCs is simple: you write your components in an HTML file that (optionally) contains a `<style>` and `<script>` attribute describing the component's styles and behaviour. Svelte, Ractive, Vue and Polymer all follow this basic pattern.\n\n<aside>\n\t<p><a href=\"blog/frameworks-without-the-framework\">Read the introductory blog post</a> if you're new to Svelte. Or <a href=\"https://twitter.com/padolsey/status/899717303234908160\">read</a> <a href=\"https://twitter.com/sveltejs/status/901818357644701696\">the</a> <a href=\"https://twitter.com/sveltejs/status/901818106309476352\">testimonials</a>.</p>\n</aside>\n\n(For the rest of this article we'll be using Svelte, obviously. But if the idea of using a template language makes you shudder — your fears are misplaced, but that's a topic for another day — then just use Vue which lets you use JSX in your SFCs.)\n\nSeveral wonderful things happen as a result:\n\n* Your styles are *scoped to the component*. No more leakage, no more unpredictable cascade. And no more sesquipedalian classnames designed to prevent conflicts.\n* You don't need to go spelunking through your folder structure to find the rules that are breaking your stuff.\n* The compiler (in Svelte's case) can **identify and remove unused styles**. No more append-only stylesheets!\n\nLet's see what that looks like in practice.\n\n<figure>\n\t<video controls poster='https://svelte-technology-assets.surge.sh/just-write-css.jpg'>\n\t\t<source type='video/mp4' src='https://svelte-technology-assets.surge.sh/just-write-css.mp4'>\n\t</video>\n\n\t<figcaption>\n\t\tIs this what they mean by 'use the platform'?\n\t</figcaption>\n</figure>\n\nEvery code editor already knows about CSS, so there's a good chance that you'll get autocomplete, linting, syntax highlighting and so on — all without additional JS-fatigue-inducing tools.\n\nAnd because it's real CSS, rather than some camelCased quotes-everywhere impostor, we can take advantage of the 'tweak in devtools, paste back into our source code' workflow, which I personally couldn't live without. Notice that we get CSS sourcemaps out of the box, so you can instantly pinpoint the lines in question. It's hard to overstate the importance of this: when you're in WYSIWYG mode, you're not thinking in terms of your component tree, so having a robust way to figure out *where these damn styles came from* is essential. Doubly so if someone else originally wrote the component. (I promise you, this is the single biggest productivity boost to your CSS workflow. If you're writing styles without sourcemaps, you are almost certainly wasting a lot of time. I know I was.)\n\nSvelte transforms your selectors (using an attribute that's also applied to affected elements, though the exact mechanism is unimportant and subject to change) to achieve the scoping. It warns on and removes any unused rules, then it minifies the result and lets you write it out to a `.css` file. There's also an experimental new option to compile to web components, using shadow DOM to encapsulate the styles, if that's your jam.\n\nThis is all possible because your CSS is parsed (with [css-tree](https://github.com/csstree/csstree)) and statically analysed in the context of your markup. Static analysis opens the doors to all kinds of exciting future possibilities — smarter optimisations, a11y hints — that are much harder if your styles are computed dynamically at runtime. We're just getting started.\n\n\n## But we can add tools to do [x]!\n\nIf your reaction to the video was 'fine, but if we use TypeScript and write plugins for each editor then we can get all the autocomplete and syntax highlighting stuff' — in other words, if you believe that in order to achieve parity with CSS it makes sense to build, document, promote and maintain a fleet of ancillary projects — then, well, you and I may never see eye to eye!\n\n\n## We don't have all the answers — yet\n\nHaving said all that, CSS-in-JS does point to answers to some lingering questions:\n\n* How can we install styles from npm?\n* How can we reuse constants that are defined in a single place?\n* How can we compose declarations?\n\nPersonally, I haven't found these issues to outweigh the benefits of the approach outlined above. You may well have a different set of priorities, and they may be reason enough for you to abandon CSS.\n\nBut at the end of the day, you have to know CSS anyway. Love it or loathe it, you must at least *learn* it. As custodians of the web, we have a choice: create abstractions that steepen the web dev learning curve yet further, or work together to fix the bad parts of CSS. I know which I choose.\n",
								},
								{
									name:
										"2017-12-31-sapper-towards-the-ideal-web-app-framework.md",
									is_dir: false,
									content:
										"---\ntitle: \"Sapper: Towards the ideal web app framework\"\ndescription: Taking the next-plus-one step\nauthor: Rich Harris\nauthorURL: https://twitter.com/Rich_Harris\n---\n\n> Quickstart for the impatient: [the Sapper docs](https://sapper.svelte.dev), and the [starter template](https://github.com/sveltejs/sapper-template)\n\nIf you had to list the characteristics of the perfect Node.js web application framework, you'd probably come up with something like this:\n\n1. It should do server-side rendering, for fast initial loads and no caveats around SEO\n2. As a corollary, your app's codebase should be universal — write once for server *and* client\n3. The client-side app should *hydrate* the server-rendered HTML, attaching event listeners (and so on) to existing elements rather than re-rendering them\n4. Navigating to subsequent pages should be instantaneous\n5. Offline, and other Progressive Web App characteristics, must be supported out of the box\n6. Only the JavaScript and CSS required for the first page should load initially. That means the framework should do automatic code-splitting at the route level, and support dynamic `import(...)` for more granular manual control\n7. No compromise on performance\n8. First-rate developer experience, with hot module reloading and all the trimmings\n9. The resulting codebase should be easy to grok and maintain\n10. It should be possible to understand and customise every aspect of the system — no webpack configs locked up in the framework, and as little hidden 'plumbing' as possible\n11. Learning the entire framework in under an hour should be easy, and not just for experienced developers\n\n[Next.js](https://github.com/zeit/next.js) is close to this ideal. If you haven't encountered it yet, I strongly recommend going through the tutorials at [learnnextjs.com](https://learnnextjs.com). Next introduced a brilliant idea: all the pages of your app are files in a `your-project/pages` directory, and each of those files is just a React component.\n\nEverything else flows from that breakthrough design decision. Finding the code responsible for a given page is easy, because you can just look at the filesystem rather than playing 'guess the component name'. Project structure bikeshedding is a thing of the past. And the combination of SSR (server-side rendering) and code-splitting — something the React Router team [gave up on](https://reacttraining.com/react-router/web/guides/code-splitting), declaring 'Godspeed those who attempt the server-rendered, code-split apps' — is trivial.\n\nBut it's not perfect. As churlish as it might be to list the flaws in something *so, so good*, there are some:\n\n* Next uses something called 'route masking' to create nice URLs (e.g. `/blog/hello-world` instead of `/post?slug=hello-world`). This undermines the guarantee about directory structure corresponding to app structure, and forces you to maintain configuration that translates between the two forms\n* All your routes are assumed to be universal 'pages'. But it's very common to need routes that only render on the server, such as a 301 redirect or an [API endpoint](/blog/sapper-towards-the-ideal-web-app-framework.json) that serves the data for your pages, and Next doesn't have a great solution for this. You can add logic to your `server.js` file to handle these cases, but it feels at odds with the declarative approach taken for pages\n* To use the client-side router, links can't be standard `<a>` tags. Instead, you have to use framework-specific `<Link>` components, which is impossible in the markdown content for a blog post such as this one, for example\n\nThe real problem, though, is that all that goodness comes for a price. The simplest possible Next app — a single 'hello world' page that renders some static text — involves 66kb of gzipped JavaScript. Unzipped, it's 204kb, which is a non-trivial amount of code for a mobile device to parse at a time when performance is a critical factor determining whether or not your users will stick around. And that's the *baseline*.\n\nWe can do better!\n\n\n## The compiler-as-framework paradigm shift\n\n[Svelte introduced a radical idea](blog/frameworks-without-the-framework): what if your UI framework wasn't a framework at all, but a compiler that turned your components into standalone JavaScript modules? Instead of using a library like React or Vue, which knows nothing about your app and must therefore be a one-size-fits-all solution, we can ship highly-optimised vanilla JavaScript. Just the code your app needs, and without the memory and performance overhead of solutions based on a virtual DOM.\n\nThe JavaScript world is [moving towards this model](https://tomdale.net/2017/09/compilers-are-the-new-frameworks/). [Stencil](https://stenciljs.com), a Svelte-inspired framework from the Ionic team, compiles to web components. [Glimmer](https://glimmerjs.com) *doesn't* compile to standalone JavaScript (the pros and cons of which deserve a separate blog post), but the team is doing some fascinating research around compiling templates to bytecode. (React is [getting in on the action](https://twitter.com/trueadm/status/944908776896978946), though their current research focuses on optimising your JSX app code, which is arguably more similar to the ahead-of-time optimisations that Angular, Ractive and Vue have been doing for a few years.)\n\nWhat happens if we use the new model as a starting point?\n\n\n## Introducing Sapper\n\n<aside><p>The <a href=\"https://sapper.svelte.dev/docs#Why_the_name\">name comes from</a> the term for combat engineers, and is also short for Svelte app maker</p></aside>\n\n[Sapper](https://sapper.svelte.dev) is the answer to that question. **Sapper is a Next.js-style framework that aims to meet the eleven criteria at the top of this article while dramatically reducing the amount of code that gets sent to the browser.** It's implemented as Express-compatible middleware, meaning it's easy to understand and customise.\n\nThe same 'hello world' app that took 204kb with React and Next weighs just 7kb with Sapper. That number is likely to fall further in the future as we explore the space of optimisation possibilities, such as not shipping any JavaScript *at all* for pages that aren't interactive, beyond the tiny Sapper runtime that handles client-side routing.\n\nWhat about a more 'real world' example? Conveniently, the [RealWorld](https://github.com/gothinkster/realworld) project, which challenges frameworks to develop an implementation of a Medium clone, gives us a way to find out. The [Sapper implementation](https://github.com/sveltejs/realworld) takes 39.6kb (11.8kb zipped) to render an interactive homepage.\n\n<aside><p>Code-splitting isn't free — if the reference implementation used code-splitting, it would be larger still</p></aside>\n\nThe entire app costs 132.7kb (39.9kb zipped), which is significantly smaller than the reference React/Redux implementation at 327kb (85.7kb), but even if it was as large it would *feel* faster because of code-splitting. And that's a crucial point. We're told we need to code-split our apps, but if your app uses a traditional framework like React or Vue then there's a hard lower bound on the size of your initial code-split chunk — the framework itself, which is likely to be a significant portion of your total app size. With the Svelte approach, that's no longer the case.\n\nBut size is only part of the story. Svelte apps are also extremely performant and memory-efficient, and the framework includes powerful features that you would sacrifice if you chose a 'minimal' or 'simple' UI library.\n\n\n## Trade-offs\n\nThe biggest drawback for many developers evaluating Sapper would be 'but I like React, and I already know how to use it', which is fair.\n\nIf you're in that camp, I'd invite you to at least try alternative frameworks. You might be pleasantly surprised! The [Sapper RealWorld](https://github.com/sveltejs/realworld) implementation totals 1,201 lines of source code, compared to 2,377 for the reference implementation, because you're able to express concepts very concisely using Svelte's template syntax (which [takes all of five minutes to master](https://v2.svelte.dev/guide#template-syntax)). You get [scoped CSS](blog/the-zen-of-just-writing-css), with unused style removal and minification built-in, and you can use preprocessors like LESS if you want. You no longer need to use Babel. SSR is ridiculously fast, because it's just string concatenation. And we recently introduced [svelte/store](https://v2.svelte.dev/guide#state-management), a tiny global store that synchronises state across your component hierarchy with zero boilerplate. The worst that can happen is that you'll end up feeling vindicated!\n\nBut there are trade-offs nonetheless. Some people have a pathological aversion to any form of 'template language', and maybe that applies to you. JSX proponents will clobber you with the 'it's just JavaScript' mantra, and therein lies React's greatest strength, which is that it is infinitely flexible. That flexibility comes with its own set of trade-offs, but we're not here to discuss those.\n\nAnd then there's *ecosystem*. The universe around React in particular — the devtools, editor integrations, ancillary libraries, tutorials, StackOverflow answers, hell, even job opportunities — is unrivalled. While it's true that citing 'ecosystem' as the main reason to choose a tool is a sign that you're stuck on a local maximum, apt to be marooned by the rising waters of progress, it's still a major point in favour of incumbents.\n\n\n## Roadmap\n\nWe're not at version 1.0.0 yet, and a few things may change before we get there. Once we do (soon!), there are a lot of exciting possibilities.\n\nI believe the next frontier of web performance is 'whole-app optimisation'. Currently, Svelte's compiler operates at the component level, but a compiler that understood the boundaries *between* those components could generate even more efficient code. The React team's [Prepack research](https://twitter.com/trueadm/status/944908776896978946) is predicated on a similar idea, and the Glimmer team is doing some interesting work in this space. Svelte and Sapper are well positioned to take advantage of these ideas.\n\nSpeaking of Glimmer, the idea of compiling components to bytecode is one that we'll probably steal in 2018. A framework like Sapper could conceivably determine which compilation mode to use based on the characteristics of your app. It could even serve JavaScript for the initial route for the fastest possible startup time, then lazily serve a bytecode interpreter for subsequent routes, resulting in the optimal combination of startup size and total app size.\n\nMostly, though, we want the direction of Sapper to be determined by its users. If you're the kind of developer who enjoys life on the bleeding edge and would like to help shape the future of how we build web apps, please join us on [GitHub](https://github.com/sveltejs/svelte) and [Discord](chat).\n",
								},
							],
						},
						{
							name: "docs",
							is_dir: true,
							content: [
								{ name: "01-one.md", is_dir: false, content: "file-one\n" },
								{ name: "02-two.md", is_dir: false, content: "file-two\n" },
								{ name: "03-three.md", is_dir: false, content: "file-three\n" },
								{ name: "04-four.md", is_dir: false, content: "file-four\n" },
								{ name: "badfile.boojoo", is_dir: false, content: "" },
							],
						},
						{
							name: "examples",
							is_dir: true,
							content: [
								{
									name: "00-introduction",
									is_dir: true,
									content: [
										{
											name: "00-hello-world",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														"<script>\n\tlet name = 'world';\n</script>\n\n<h1>Hello {name}!</h1>",
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "Hello world"\n}',
												},
											],
										},
										{
											name: "01-dynamic-attributes",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														"<script>\n\tlet src = 'tutorial/image.gif';\n\tlet name = 'Rick Astley';\n</script>\n\n<!-- {src} is short for src={src} -->\n<img {src} alt=\"{name} dancing\">",
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "Dynamic attributes"\n}',
												},
											],
										},
										{
											name: "02-styling",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														"<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>Styled!</p>",
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "Styling"\n}',
												},
											],
										},
										{
											name: "03-nested-components",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>These styles...</p>\n<Nested/>",
												},
												{
													name: "Nested.svelte",
													is_dir: false,
													content: "<p>...don't affect this element</p>",
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "Nested components"\n}',
												},
											],
										},
										{
											name: "04-html-tags",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														"<script>\n\tlet string = `here's some <strong>HTML!!!</strong>`;\n</script>\n\n<p>{@html string}</p>",
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "HTML tags"\n}',
												},
											],
										},
										{
											name: "meta.json",
											is_dir: false,
											content: '{\n\t"title": "Introduction"\n}',
										},
									],
								},
								{
									name: "01-reactivity",
									is_dir: true,
									content: [
										{
											name: "00-reactive-assignments",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														"<script>\n\tlet count = 0;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "Reactive assignments"\n}',
												},
											],
										},
										{
											name: "01-reactive-declarations",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														"<script>\n\tlet count = 1;\n\n\t// the `$:` means 're-run whenever these values change'\n\t$: doubled = count * 2;\n\t$: quadrupled = doubled * 2;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tCount: {count}\n</button>\n\n<p>{count} * 2 = {doubled}</p>\n<p>{doubled} * 2 = {quadrupled}</p>",
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "Reactive declarations"\n}',
												},
											],
										},
										{
											name: "02-reactive-statements",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														"<script>\n\tlet count = 0;\n\n\t$: if (count >= 10) {\n\t\talert(`count is dangerously high!`);\n\t\tcount = 9;\n\t}\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "Reactive statements"\n}',
												},
											],
										},
										{
											name: "meta.json",
											is_dir: false,
											content: '{\n\t"title": "Reactivity"\n}',
										},
									],
								},
								{
									name: "02-props",
									is_dir: true,
									content: [
										{
											name: "00-declaring-props",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<Nested answer={42}/>",
												},
												{
													name: "Nested.svelte",
													is_dir: false,
													content:
														"<script>\n\texport let answer;\n</script>\n\n<p>The answer is {answer}</p>",
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "Declaring props"\n}',
												},
											],
										},
										{
											name: "01-default-values",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<Nested answer={42}/>\n<Nested/>",
												},
												{
													name: "Nested.svelte",
													is_dir: false,
													content:
														"<script>\n\texport let answer = 'a mystery';\n</script>\n\n<p>The answer is {answer}</p>",
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "Default values"\n}',
												},
											],
										},
										{
											name: "02-spread-props",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														"<script>\n\timport Info from './Info.svelte';\n\n\tconst pkg = {\n\t\tname: 'svelte',\n\t\tversion: 3,\n\t\tspeed: 'blazing',\n\t\twebsite: 'https://svelte.dev'\n\t};\n</script>\n\n<Info {...pkg}/>",
												},
												{
													name: "Info.svelte",
													is_dir: false,
													content:
														'<script>\n\texport let name;\n\texport let version;\n\texport let speed;\n\texport let website;\n</script>\n\n<p>\n\tThe <code>{name}</code> package is {speed} fast.\n\tDownload version {version} from <a href="https://www.npmjs.com/package/{name}">npm</a>\n\tand <a href={website}>learn more here</a>\n</p>',
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "Spread props"\n}',
												},
											],
										},
										{
											name: "meta.json",
											is_dir: false,
											content: '{\n\t"title": "Props"\n}',
										},
									],
								},
								{
									name: "03-logic",
									is_dir: true,
									content: [
										{
											name: "00-if-blocks",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{/if}\n\n{#if !user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}",
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "If blocks"\n}',
												},
											],
										},
										{
											name: "01-else-blocks",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{:else}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}",
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "Else blocks"\n}',
												},
											],
										},
										{
											name: "02-else-if-blocks",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														"<script>\n\tlet x = 7;\n</script>\n\n{#if x > 10}\n\t<p>{x} is greater than 10</p>\n{:else if 5 > x}\n\t<p>{x} is less than 5</p>\n{:else}\n\t<p>{x} is between 5 and 10</p>\n{/if}",
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "Else-if blocks"\n}',
												},
											],
										},
										{
											name: "03-each-blocks",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														"<script>\n\tlet cats = [\n\t\t{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },\n\t\t{ id: 'z_AbfPXTKms', name: 'Maru' },\n\t\t{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }\n\t];\n</script>\n\n<h1>The Famous Cats of YouTube</h1>\n\n<ul>\n\t{#each cats as { id, name }, i}\n\t\t<li><a target=\"_blank\" href=\"https://www.youtube.com/watch?v={id}\">\n\t\t\t{i + 1}: {name}\n\t\t</a></li>\n\t{/each}\n</ul>",
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "Each blocks"\n}',
												},
											],
										},
										{
											name: "04-keyed-each-blocks",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														"<script>\n\timport Thing from './Thing.svelte';\n\n\tlet things = [\n\t\t{ id: 1, color: '#0d0887' },\n\t\t{ id: 2, color: '#6a00a8' },\n\t\t{ id: 3, color: '#b12a90' },\n\t\t{ id: 4, color: '#e16462' },\n\t\t{ id: 5, color: '#fca636' }\n\t];\n\n\tfunction handleClick() {\n\t\tthings = things.slice(1);\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tRemove first thing\n</button>\n\n<div style=\"display: grid; grid-template-columns: 1fr 1fr; grid-gap: 1em\">\n\t<div>\n\t\t<h2>Keyed</h2>\n\t\t{#each things as thing (thing.id)}\n\t\t\t<Thing current={thing.color}/>\n\t\t{/each}\n\t</div>\n\n\t<div>\n\t\t<h2>Unkeyed</h2>\n\t\t{#each things as thing}\n\t\t\t<Thing current={thing.color}/>\n\t\t{/each}\n\t</div>\n</div>\n",
												},
												{
													name: "Thing.svelte",
													is_dir: false,
													content:
														'<script>\n\t// `current` is updated whenever the prop value changes...\n\texport let current;\n\n\t// ...but `initial` is fixed upon initialisation\n\tconst initial = current;\n</script>\n\n<p>\n\t<span style="background-color: {initial}">initial</span>\n\t<span style="background-color: {current}">current</span>\n</p>\n\n<style>\n\tspan {\n\t\tdisplay: inline-block;\n\t\tpadding: 0.2em 0.5em;\n\t\tmargin: 0 0.2em 0.2em 0;\n\t\twidth: 4em;\n\t\ttext-align: center;\n\t\tborder-radius: 0.2em;\n\t\tcolor: white;\n\t}\n</style>',
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "Keyed each blocks"\n}',
												},
											],
										},
										{
											name: "05-await-blocks",
											is_dir: true,
											content: [
												{
													name: "App.svelte",
													is_dir: false,
													content:
														'<script>\n\tlet promise = getRandomNumber();\n\n\tasync function getRandomNumber() {\n\t\tconst res = await fetch(`tutorial/random-number`);\n\t\tconst text = await res.text();\n\n\t\tif (res.ok) {\n\t\t\treturn text;\n\t\t} else {\n\t\t\tthrow new Error(text);\n\t\t}\n\t}\n\n\tfunction handleClick() {\n\t\tpromise = getRandomNumber();\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tgenerate random number\n</button>\n\n{#await promise}\n\t<p>...waiting</p>\n{:then number}\n\t<p>The number is {number}</p>\n{:catch error}\n\t<p style="color: red">{error.message}</p>\n{/await}',
												},
												{
													name: "meta.json",
													is_dir: false,
													content: '{\n\t"title": "Await blocks"\n}',
												},
											],
										},
										{
											name: "meta.json",
											is_dir: false,
											content: '{\n\t"title": "Logic"\n}',
										},
									],
								},
							],
						},
						{
							name: "faq",
							is_dir: true,
							content: [
								{
									name: "100-im-new-to-svelte.md",
									is_dir: false,
									content:
										"---\nquestion: I'm new to Svelte. Where should I start?\n---\n\nWe think the best way to get started is playing through the interactive [Tutorial](tutorial). Each step there is mainly focused on one specific aspect and is easy to follow. You'll be editing and running real Svelte components right in your browser.\n\nFive to ten minutes should be enough to get you up and running. An hour and a half should get you through the entire tutorial.",
								},
								{
									name: "200-are-there-any-video-courses.md",
									is_dir: false,
									content:
										"---\nquestion: Are there any video courses?\n---\n\nRich Harris, the creator of Svelte, taught a course:\n\n- [Frontend Masters](https://frontendmasters.com/courses/svelte/)\n\nThere are also a number of third-party courses:\n\n- [Egghead](https://egghead.io/browse/frameworks/svelte)\n- [Udemy](https://www.udemy.com/courses/search/?q=sveltejs+svelte)\n\nNote that Udemy very frequently has discounts over 90%.\n",
								},
								{
									name: "250-are-there-any-books.md",
									is_dir: false,
									content:
										"---\nquestion: Are there any books?\n---\n\nThere are a few books:\n\n- [Svelte Handbook](https://flaviocopes.com/page/download-svelte-handbook/) by Flavio Copes\n- [Svelte 3 Up and Running](https://www.amazon.com/dp/B08D6T6BKS/) by Alessandro Segala\n- [Svelte and Sapper in Action](https://www.manning.com/books/svelte-and-sapper-in-action) by R. Mark Volkmann\n",
								},
								{
									name: "400-how-can-i-get-syntax-highlighting.md",
									is_dir: false,
									content:
										"---\nquestion: How can I get VS Code to syntax-highlight my .svelte files?\n---\n\nThere is an [official VS Code extension for Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).\n",
								},
								{
									name: "450-how-do-i-document-my-components.md",
									is_dir: false,
									content:
										"---\nquestion: How do I document my components?\n---\n\nIn editors which use the Svelte Language Server you can document Components, functions and exports using specially formatted comments.\n\n````svelte\n<script>\n\t/** What should we call the user? */\n\texport let name = 'world';\n</script>\n\n<!--\n@component\nHere's some documentation for this component.\nIt will show up on hover.\n\n- You can use markdown here.\n- You can also use code blocks here.\n- Usage:\n  ```tsx\n  <main name=\"Arethra\">\n  ```\n-->\n<main>\n\t<h1>\n\t\tHello, {name}\n\t</h1>\n</main>\n````\n\nNote: The `@component` is necessary in the HTML comment which describes your component.\n",
								},
							],
						},
						{
							name: "migrating",
							is_dir: true,
							content: [
								{
									name: "01-migrating.md",
									is_dir: false,
									content:
										"---\ntitle: Migrating from Sapper\n---\n\nSvelteKit is the successor to Sapper and shares many elements of its design.\n\nIf you have an existing Sapper app that you plan to migrate to SvelteKit, however, there are a number of changes you will need to make. You may find it helpful to view the [examples](https://github.com/sveltejs/kit/tree/master/examples) while migrating.\n\n",
								},
								{
									name: "02-pkg.md",
									is_dir: false,
									content:
										'---\ntitle: package.json\n---\n\n### type : "module"\n\nAdd `"type": "module"` to your `package.json`\n\n### dependencies\n\nRemove `polka` or `express`, if you\'re using one of those, and any middleware such as `sirv` or `compression`.\n\n### devDependencies\n\nRemove `sapper` from your `devDependencies` and replace it with `@sveltejs/kit`, `vite`, and whichever [adapter](/docs#adapters) you plan to use (see [next section](#project-files-configuration)).\n\n### scripts\n\nAny scripts that reference the `sapper` binary should be updated:\n\n* `sapper build` or `sapper export` should become [`svelte-kit build`](/docs#command-line-interface-svelte-kit-build)\n* `sapper dev` should become [`svelte-kit dev`](/docs#command-line-interface-svelte-kit-dev)\n\nAdditionally, [`svelte-kit start`](/docs#command-line-interface-svelte-kit-start) replaces any command that invokes your Sapper-built server.\n',
								},
								{
									name: "03-project-files.md",
									is_dir: false,
									content:
										"---\ntitle: Project files\n---\n\nThe bulk of your app, in `src/routes`, can be left where it is, but several project files will need to be moved or updated.\n\n### Configuration\n\nYour `webpack.config.js` or `rollup.config.js` should be replaced with a `svelte.config.cjs`, as documented [here](/docs#configuration). Svelte preprocessor options should be moved to `config.preprocess`.\n\nYou will need to add an [adapter](/docs#adapters). `sapper build` is roughly equivalent to [adapter-node](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) while `sapper export` is roughly equivalent to [adapter-static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static), though you might prefer to use an adapter designed for the platform you're deploying to.\n\nIf you were using plugins for filetypes that are not automatically handled by [Vite](https://vitejs.dev), you will need to find Vite equivalents and add them to the [Vite config](/docs#configuration-vite).\n\n### src/client.js\n\nThis file has no equivalent in SvelteKit. Any custom logic (beyond `sapper.start(...)`) should be expressed in your `$layout.svelte` file, inside an `onMount` callback.\n\n### src/server.js\n\nThis file also has no direct equivalent, since SvelteKit apps can run in serverless environments. You can, however, use the [hooks module](/docs#hooks) to implement session logic.\n\n### src/service-worker.js\n\nMost imports from `@sapper/service-worker` have equivalents in [`$service-worker`](/docs#modules-service-worker):\n\n- `timestamp` is unchanged\n- `files` is unchanged\n- `shell` is now `build`\n- `routes` has been removed\n\n### src/template.html\n\nThe `src/template.html` file should be renamed `src/app.html`.\n\nRemove `%sapper.base%`, `%sapper.scripts%` and `%sapper.styles%`. Replace `%sapper.head%` with `%svelte.head%` and `%sapper.html%` with `%svelte.body%`.\n\nThe `<div id=\"sapper\">` is no longer necessary, though you can continue mounting the app to a wrapper element by specifying it with the [`target`](/docs#configuration-target) config option.\n\n### src/node_modules\n\nA common pattern in Sapper apps is to put your internal library in a directory inside `src/node_modules`. This doesn't work with Vite, so we use [`src/lib`](/docs#modules-lib) instead.\n",
								},
								{
									name: "04-pages.md",
									is_dir: false,
									content:
										"---\ntitle: Pages and layouts\n---\n\n### Renamed files\n\nYour custom error page component should be renamed from `_error.svelte` to `$error.svelte`. Any `_layout.svelte` files should likewise be renamed `$layout.svelte`. The `_` prefix now exclusively denotes your _own_ 'private' components and modules, as opposed to those with a special meaning to SvelteKit.\n\n### Imports\n\nThe `goto`, `prefetch` and `prefetchRoutes` imports from `@sapper/app` should be replaced with identical imports from [`$app/navigation`](/docs#modules-app-navigation).\n\nThe `stores` import from `@sapper/app` should be replaced — see the [Stores](#pages-and-layouts-stores) section below.\n\nAny files you previously imported from directories in `src/node_modules` will need to be replaced with [`$lib`](/docs#modules-lib) imports.\n\n### Preload\n\nAs before, pages and layout components can export a function that allows data to be loaded before rendering takes place.\n\nThis function has been renamed from `preload` to [`load`](/docs#loading), and its API has changed. Instead of two arguments — `page` and `session` — there is a single argument that includes both, along with `fetch` (which replaces `this.fetch`) and a new `context` object.\n\nThere is no more `this` object, and consequently no `this.fetch`, `this.error` or `this.redirect`. Instead of returning props directly, `load` now returns an object that _contains_ `props`, alongside various other things.\n\nLastly, if your page has a `load` method, make sure to return something otherwise you will get `Not found`.\n\n### Stores\n\nIn Sapper, you would get references to provided stores like so:\n\n```js\nimport { stores } from '@sapper/app';\nconst { preloading, page, session } = stores();\n```\n\nThe `page` and `session` stores still exist; `preloading` has been replaced with a `navigating` store that contains `from` and `to` properties.\n\nYou access them differently in SvelteKit. `stores` is now `getStores`, but in most cases it is unnecessary since you can import `navigating`, `page` and `session` directly from [`$app/stores`](/docs#modules-app-stores).\n\n### Routing\n\nRegex routes are no longer supported. Instead, use [fallthrough routes](/docs#routing-advanced-fallthrough-routes).\n\n### URLs\n\nIn Sapper, all relative URLs were resolved against the base URL — usually `/`, unless the `basepath` option was used — rather than against the current page.\n\nThis caused problems and is no longer the case in SvelteKit. Instead, URLs are resolved against the current page (or the destination page, for `fetch` URLs in `load` functions) instead.\n\n### &lt;a&gt; attributes\n\n- `sapper:prefetch` is now `sveltekit:prefetch`\n- `sapper:noscroll` is now `sveltekit:noscroll`\n",
								},
								{
									name: "05-endpoints.md",
									is_dir: false,
									content:
										"---\ntitle: Endpoints\n---\n\nIn Sapper, 'server routes' — now referred to as [endpoints](/docs#routing-endpoints) — received the `req` and `res` objects exposed by Node's `http` module (or the augmented versions provided by frameworks like Polka and Express).\n\nSvelteKit is designed to be agnostic as to where the app is running — it could be running on a Node server, but could equally be running on a serverless platform or in a Cloudflare Worker. For that reason, you no longer interact directly with `req` and `res`. Your endpoints will need to be updated to match the new signature.",
								},
								{
									name: "99-integrations.md",
									is_dir: false,
									content:
										"---\ntitle: Integrations\n---\n\nSee [sveltejs/integrations](https://github.com/sveltejs/integrations#sveltekit) for examples of setting up popular tools like PostCSS, Tailwind CSS, mdsvex, Firebase, GraphQL, and Bulma.",
								},
							],
						},
						{
							name: "tutorial",
							is_dir: true,
							content: [
								{
									name: "01-introduction",
									is_dir: true,
									content: [
										{
											name: "01-basics",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content: "<h1>Hello world!</h1>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Basics\n---\n\nWelcome to the Svelte tutorial. This will teach you everything you need to know to build fast, small web applications easily.\n\nYou can also consult the [API docs](docs) and the [examples](examples), or — if you're impatient to start hacking on your machine locally — the [60-second quickstart](blog/the-easiest-way-to-get-started).\n\n\n## What is Svelte?\n\nSvelte is a tool for building fast web applications.\n\nIt is similar to JavaScript frameworks such as React and Vue, which share a goal of making it easy to build slick interactive user interfaces.\n\nBut there's a crucial difference: Svelte converts your app into ideal JavaScript at *build time*, rather than interpreting your application code at *run time*. This means you don't pay the performance cost of the framework's abstractions, and you don't incur a penalty when your app first loads.\n\nYou can build your entire app with Svelte, or you can add it incrementally to an existing codebase. You can also ship components as standalone packages that work anywhere, without the overhead of a dependency on a conventional framework.\n\n\n## How to use this tutorial\n\nYou'll need to have basic familiarity with HTML, CSS and JavaScript to understand Svelte.\n\nAs you progress through the tutorial, you'll be presented with mini exercises designed to illustrate new features. Later chapters build on the knowledge gained in earlier ones, so it's recommended that you go from start to finish. If necessary, you can navigate via the dropdown above (click 'Introduction / Basics').\n\nEach tutorial chapter will have a 'Show me' button that you can click if you get stuck following the instructions. Try not to rely on it too much; you will learn faster by figuring out where to put each suggested code block and manually typing it in to the editor.\n\n\n## Understanding components\n\nIn Svelte, an application is composed from one or more *components*. A component is a reusable self-contained block of code that encapsulates HTML, CSS and JavaScript that belong together, written into a `.svelte` file. The 'hello world' example in the code editor is a simple component.\n",
												},
											],
										},
										{
											name: "02-adding-data",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content: "<h1>Hello world!</h1>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet name = 'world';\n</script>\n\n<h1>Hello {name.toUpperCase()}!</h1>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Adding data\n---\n\nA component that just renders some static markup isn't very interesting. Let's add some data.\n\nFirst, add a script tag to your component and declare a `name` variable:\n\n```html\n<script>\n\tlet name = 'world';\n</script>\n\n<h1>Hello world!</h1>\n```\n\nThen, we can refer to `name` in the markup:\n\n```html\n<h1>Hello {name}!</h1>\n```\n\nInside the curly braces, we can put any JavaScript we want. Try changing `name` to `name.toUpperCase()` for a shoutier greeting.",
												},
											],
										},
										{
											name: "03-dynamic-attributes",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet src = 'tutorial/image.gif';\n</script>\n\n<img>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet src = 'tutorial/image.gif';\n\tlet name = 'Rick Astley';\n</script>\n\n<img {src} alt=\"{name} dances.\">\n",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Dynamic attributes\n---\n\nJust like you can use curly braces to control text, you can use them to control element attributes.\n\nOur image is missing a `src` — let's add one:\n\n```html\n<img src={src}>\n```\n\nThat's better. But Svelte is giving us a warning:\n\n> A11y: &lt;img&gt; element should have an alt attribute\n\nWhen building web apps, it's important to make sure that they're *accessible* to the broadest possible userbase, including people with (for example) impaired vision or motion, or people without powerful hardware or good internet connections. Accessibility (shortened to a11y) isn't always easy to get right, but Svelte will help by warning you if you write inaccessible markup.\n\nIn this case, we're missing the `alt` attribute that describes the image for people using screenreaders, or people with slow or flaky internet connections that can't download the image. Let's add one:\n\n```html\n<img src={src} alt=\"A man dances.\">\n```\n\nWe can use curly braces *inside* attributes. Try changing it to `\"{name} dances.\"` — remember to declare a `name` variable in the `<script>` block.\n\n\n## Shorthand attributes\n\nIt's not uncommon to have an attribute where the name and value are the same, like `src={src}`. Svelte gives us a convenient shorthand for these cases:\n\n```html\n<img {src} alt=\"A man dances.\">\n```\n\n",
												},
											],
										},
										{
											name: "04-styling",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<style>\n\t/* styles goes here */\n</style>\n\n<p>This is a paragraph.</p>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>This is a paragraph.</p>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Styling\n---\n\nJust like in HTML, you can add a `<style>` tag to your component. Let's add some styles to the `<p>` element:\n\n```html\n<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>This is a paragraph.</p>\n```\n\nImportantly, these rules are *scoped to the component*. You won't accidentally change the style of `<p>` elements elsewhere in your app, as we'll see in the next step.",
												},
											],
										},
										{
											name: "05-nested-components",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>This is a paragraph.</p>",
														},
														{
															name: "Nested.svelte",
															is_dir: false,
															content: "<p>This is another paragraph.</p>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<style>\n\tp {\n\t\tcolor: purple;\n\t\tfont-family: 'Comic Sans MS', cursive;\n\t\tfont-size: 2em;\n\t}\n</style>\n\n<p>This is a paragraph.</p>\n<Nested/>",
														},
														{
															name: "Nested.svelte",
															is_dir: false,
															content: "<p>This is another paragraph.</p>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Nested components\n---\n\nIt would be impractical to put your entire app in a single component. Instead, we can import components from other files and include them as though we were including elements.\n\nAdd a `<script>` tag that imports `Nested.svelte`...\n\n```html\n<script>\n\timport Nested from './Nested.svelte';\n</script>\n```\n\n...then add it to the markup:\n\n```html\n<p>This is a paragraph.</p>\n<Nested/>\n```\n\nNotice that even though `Nested.svelte` has a `<p>` element, the styles from `App.svelte` don't leak in.\n\nAlso notice that the component name `Nested` is capitalised. This convention has been adopted to allow us to differentiate between user-defined components and regular HTML tags.\n",
												},
											],
										},
										{
											name: "06-html-tags",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet string = `this string contains some <strong>HTML!!!</strong>`;\n</script>\n\n<p>{string}</p>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet string = `this string contains some <strong>HTML!!!</strong>`;\n</script>\n\n<p>{@html string}</p>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: HTML tags\n---\n\nOrdinarily, strings are inserted as plain text, meaning that characters like `<` and `>` have no special meaning.\n\nBut sometimes you need to render HTML directly into a component. For example, the words you're reading right now exist in a markdown file that gets included on this page as a blob of HTML.\n\nIn Svelte, you do this with the special `{@html ...}` tag:\n\n```html\n<p>{@html string}</p>\n```\n\n> Svelte doesn't perform any sanitization of the expression inside `{@html ...}` before it gets inserted into the DOM. In other words, if you use this feature it's critical that you manually escape HTML that comes from sources you don't trust, otherwise you risk exposing your users to XSS attacks.\n",
												},
											],
										},
										{
											name: "07-making-an-app",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content: "<h1>What now?</h1>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Making an app\n---\n\nThis tutorial is designed to get you familiar with the process of writing components. But at some point, you'll want to start writing components in the comfort of your own text editor.\n\nFirst, you'll need to integrate Svelte with a build tool. There are officially maintained plugins for [Rollup](https://rollupjs.org) and [webpack](https://webpack.js.org/)...\n\n* [rollup-plugin-svelte](https://github.com/sveltejs/rollup-plugin-svelte)\n* [svelte-loader](https://github.com/sveltejs/svelte-loader)\n\n...and a variety of [community-maintained ones](https://github.com/sveltejs/integrations#bundler-plugins).\n\nDon't worry if you're relatively new to web development and haven't used these tools before. We've prepared a simple step-by-step guide, [Svelte for new developers](blog/svelte-for-new-developers), which walks you through the process.\n\nYou'll also want to configure your text editor. If you're using VS Code, install the [Svelte extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode), otherwise follow [this guide](blog/setting-up-your-editor) to configure your text editor to treat `.svelte` files the same as `.html` for the sake of syntax highlighting.\n\nThen, once you've got your project set up, using Svelte components is easy. The compiler turns each component into a regular JavaScript class — just import it and instantiate with `new`:\n\n```js\nimport App from './App.svelte';\n\nconst app = new App({\n\ttarget: document.body,\n\tprops: {\n\t\t// we'll learn about props later\n\t\tanswer: 42\n\t}\n});\n```\n\nYou can then interact with `app` using the [component API](docs#Client-side_component_API) if you need to.\n",
												},
											],
										},
										{
											name: "meta.json",
											is_dir: false,
											content: '{\n\t"title": "Introduction"\n}',
										},
									],
								},
								{
									name: "02-reactivity",
									is_dir: true,
									content: [
										{
											name: "01-reactive-assignments",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet count = 0;\n\n\tfunction handleClick() {\n\t\t// event handler code goes here\n\t}\n</script>\n\n<button>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet count = 0;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Assignments\n---\n\nAt the heart of Svelte is a powerful system of *reactivity* for keeping the DOM in sync with your application state — for example, in response to an event.\n\nTo demonstrate it, we first need to wire up an event handler. Replace line 9 with this:\n\n```html\n<button on:click={handleClick}>\n```\n\nInside the `handleClick` function, all we need to do is change the value of `count`:\n\n```js\nfunction handleClick() {\n\tcount += 1;\n}\n```\n\nSvelte 'instruments' this assignment with some code that tells it the DOM will need to be updated.",
												},
											],
										},
										{
											name: "02-reactive-declarations",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet count = 0;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet count = 0;\n\t$: doubled = count * 2;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>\n\n<p>{count} doubled is {doubled}</p>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Declarations\n---\n\nSvelte automatically updates the DOM when your component's state changes. Often, some parts of a component's state need to be computed from *other* parts (such as a `fullname` derived from a `firstname` and a `lastname`), and recomputed whenever they change.\n\nFor these, we have *reactive declarations*. They look like this:\n\n```js\nlet count = 0;\n$: doubled = count * 2;\n```\n\n> Don't worry if this looks a little alien. It's [valid](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label) (if unconventional) JavaScript, which Svelte interprets to mean 're-run this code whenever any of the referenced values change'. Once you get used to it, there's no going back.\n\nLet's use `doubled` in our markup:\n\n```html\n<p>{count} doubled is {doubled}</p>\n```\n\nOf course, you could just write `{count * 2}` in the markup instead — you don't have to use reactive values. Reactive values become particularly valuable when you need to reference them multiple times, or you have values that depend on *other* reactive values.\n",
												},
											],
										},
										{
											name: "03-reactive-statements",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet count = 0;\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet count = 0;\n\n\t$: if (count >= 10) {\n\t\talert(`count is dangerously high!`);\n\t\tcount = 9;\n\t}\n\n\tfunction handleClick() {\n\t\tcount += 1;\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClicked {count} {count === 1 ? 'time' : 'times'}\n</button>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Statements\n---\n\nWe're not limited to declaring reactive *values* — we can also run arbitrary *statements* reactively. For example, we can log the value of `count` whenever it changes:\n\n```js\n$: console.log(`the count is ${count}`);\n```\n\nYou can easily group statements together with a block:\n\n```js\n$: {\n\tconsole.log(`the count is ${count}`);\n\talert(`I SAID THE COUNT IS ${count}`);\n}\n```\n\nYou can even put the `$:` in front of things like `if` blocks:\n\n```js\n$: if (count >= 10) {\n\talert(`count is dangerously high!`);\n\tcount = 9;\n}\n```",
												},
											],
										},
										{
											name: "04-updating-arrays-and-objects",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet numbers = [1, 2, 3, 4];\n\n\tfunction addNumber() {\n\t\tnumbers.push(numbers.length + 1);\n\t}\n\n\t$: sum = numbers.reduce((t, n) => t + n, 0);\n</script>\n\n<p>{numbers.join(' + ')} = {sum}</p>\n\n<button on:click={addNumber}>\n\tAdd a number\n</button>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet numbers = [1, 2, 3, 4];\n\n\tfunction addNumber() {\n\t\tnumbers = [...numbers, numbers.length + 1];\n\t}\n\n\t$: sum = numbers.reduce((t, n) => t + n, 0);\n</script>\n\n<p>{numbers.join(' + ')} = {sum}</p>\n\n<button on:click={addNumber}>\n\tAdd a number\n</button>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Updating arrays and objects\n---\n\nBecause Svelte's reactivity is triggered by assignments, using array methods like `push` and `splice` won't automatically cause updates. For example, clicking the button doesn't do anything.\n\nOne way to fix that is to add an assignment that would otherwise be redundant:\n\n```js\nfunction addNumber() {\n\tnumbers.push(numbers.length + 1);\n\tnumbers = numbers;\n}\n```\n\nBut there's a more idiomatic solution:\n\n```js\nfunction addNumber() {\n\tnumbers = [...numbers, numbers.length + 1];\n}\n```\n\nYou can use similar patterns to replace `pop`, `shift`, `unshift` and `splice`.\n\nAssignments to *properties* of arrays and objects — e.g. `obj.foo += 1` or `array[i] = x` — work the same way as assignments to the values themselves.\n\n```js\nfunction addNumber() {\n\tnumbers[numbers.length] = numbers.length + 1;\n}\n```\n\nA simple rule of thumb: the name of the updated variable must appear on the left hand side of the assignment. For example this...\n\n```js\nconst foo = obj.foo;\nfoo.bar = 'baz';\n```\n\n...won't update references to `obj.foo.bar`, unless you follow it up with `obj = obj`.",
												},
											],
										},
										{
											name: "meta.json",
											is_dir: false,
											content: '{\n\t"title": "Reactivity"\n}',
										},
									],
								},
								{
									name: "03-props",
									is_dir: true,
									content: [
										{
											name: "01-declaring-props",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<Nested answer={42}/>",
														},
														{
															name: "Nested.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet answer;\n</script>\n\n<p>The answer is {answer}</p>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<Nested answer={42}/>",
														},
														{
															name: "Nested.svelte",
															is_dir: false,
															content:
																"<script>\n\texport let answer;\n</script>\n\n<p>The answer is {answer}</p>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Declaring props\n---\n\nSo far, we've dealt exclusively with internal state — that is to say, the values are only accessible within a given component.\n\nIn any real application, you'll need to pass data from one component down to its children. To do that, we need to declare *properties*, generally shortened to 'props'. In Svelte, we do that with the `export` keyword. Edit the `Nested.svelte` component:\n\n```html\n<script>\n\texport let answer;\n</script>\n```\n\n> Just like `$:`, this may feel a little weird at first. That's not how `export` normally works in JavaScript modules! Just roll with it for now — it'll soon become second nature.",
												},
											],
										},
										{
											name: "02-default-values",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<Nested answer={42}/>",
														},
														{
															name: "Nested.svelte",
															is_dir: false,
															content:
																"<script>\n\texport let answer;\n</script>\n\n<p>The answer is {answer}</p>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\timport Nested from './Nested.svelte';\n</script>\n\n<Nested answer={42}/>\n<Nested/>",
														},
														{
															name: "Nested.svelte",
															is_dir: false,
															content:
																"<script>\n\texport let answer = 'a mystery';\n</script>\n\n<p>The answer is {answer}</p>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Default values\n---\n\nWe can easily specify default values for props in `Nested.svelte`:\n\n```html\n<script>\n\texport let answer = 'a mystery';\n</script>\n```\n\nIf we now add a second component *without* an `answer` prop, it will fall back to the default:\n\n```html\n<Nested answer={42}/>\n<Nested/>\n```\n",
												},
											],
										},
										{
											name: "03-spread-props",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\timport Info from './Info.svelte';\n\n\tconst pkg = {\n\t\tname: 'svelte',\n\t\tversion: 3,\n\t\tspeed: 'blazing',\n\t\twebsite: 'https://svelte.dev'\n\t};\n</script>\n\n<Info name={pkg.name} version={pkg.version} speed={pkg.speed} website={pkg.website}/>",
														},
														{
															name: "Info.svelte",
															is_dir: false,
															content:
																'<script>\n\texport let name;\n\texport let version;\n\texport let speed;\n\texport let website;\n</script>\n\n<p>\n\tThe <code>{name}</code> package is {speed} fast.\n\tDownload version {version} from <a href="https://www.npmjs.com/package/{name}">npm</a>\n\tand <a href={website}>learn more here</a>\n</p>',
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\timport Info from './Info.svelte';\n\n\tconst pkg = {\n\t\tname: 'svelte',\n\t\tversion: 3,\n\t\tspeed: 'blazing',\n\t\twebsite: 'https://svelte.dev'\n\t};\n</script>\n\n<Info {...pkg}/>",
														},
														{
															name: "Info.svelte",
															is_dir: false,
															content:
																'<script>\n\texport let name;\n\texport let version;\n\texport let speed;\n\texport let website;\n</script>\n\n<p>\n\tThe <code>{name}</code> package is {speed} fast.\n\tDownload version {version} from <a href="https://www.npmjs.com/package/{name}">npm</a>\n\tand <a href={website}>learn more here</a>\n</p>',
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Spread props\n---\n\nIf you have an object of properties, you can 'spread' them onto a component instead of specifying each one:\n\n```html\n<Info {...pkg}/>\n```\n\n> Conversely, if you need to reference all the props that were passed into a component, including ones that weren't declared with `export`, you can do so by accessing `$$props` directly. It's not generally recommended, as it's difficult for Svelte to optimise, but it's useful in rare cases.\n",
												},
											],
										},
										{
											name: "meta.json",
											is_dir: false,
											content: '{\n\t"title": "Props"\n}',
										},
									],
								},
								{
									name: "04-logic",
									is_dir: true,
									content: [
										{
											name: "01-if-blocks",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n<button on:click={toggle}>\n\tLog out\n</button>\n\n<button on:click={toggle}>\n\tLog in\n</button>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{/if}\n\n{#if !user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: If blocks\n---\n\nHTML doesn't have a way of expressing *logic*, like conditionals and loops. Svelte does.\n\nTo conditionally render some markup, we wrap it in an `if` block:\n\n```html\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{/if}\n\n{#if !user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}\n```\n\nTry it — update the component, and click on the buttons.",
												},
											],
										},
										{
											name: "02-else-blocks",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{/if}\n\n{#if !user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet user = { loggedIn: false };\n\n\tfunction toggle() {\n\t\tuser.loggedIn = !user.loggedIn;\n\t}\n</script>\n\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{:else}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Else blocks\n---\n\nSince the two conditions — `if user.loggedIn` and `if !user.loggedIn` — are mutually exclusive, we can simplify this component slightly by using an `else` block:\n\n```html\n{#if user.loggedIn}\n\t<button on:click={toggle}>\n\t\tLog out\n\t</button>\n{:else}\n\t<button on:click={toggle}>\n\t\tLog in\n\t</button>\n{/if}\n```\n\n> A `#` character always indicates a *block opening* tag. A `/` character always indicates a *block closing* tag. A `:` character, as in `{:else}`, indicates a *block continuation* tag. Don't worry — you've already learned almost all the syntax Svelte adds to HTML.",
												},
											],
										},
										{
											name: "03-else-if-blocks",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet x = 7;\n</script>\n\n{#if x > 10}\n\t<p>{x} is greater than 10</p>\n{:else}\n\t{#if 5 > x}\n\t\t<p>{x} is less than 5</p>\n\t{:else}\n\t\t<p>{x} is between 5 and 10</p>\n\t{/if}\n{/if}",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet x = 7;\n</script>\n\n{#if x > 10}\n\t<p>{x} is greater than 10</p>\n{:else if 5 > x}\n\t<p>{x} is less than 5</p>\n{:else}\n\t<p>{x} is between 5 and 10</p>\n{/if}",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Else-if blocks\n---\n\nMultiple conditions can be 'chained' together with `else if`:\n\n```html\n{#if x > 10}\n\t<p>{x} is greater than 10</p>\n{:else if 5 > x}\n\t<p>{x} is less than 5</p>\n{:else}\n\t<p>{x} is between 5 and 10</p>\n{/if}\n```",
												},
											],
										},
										{
											name: "04-each-blocks",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet cats = [\n\t\t{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },\n\t\t{ id: 'z_AbfPXTKms', name: 'Maru' },\n\t\t{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }\n\t];\n</script>\n\n<h1>The Famous Cats of YouTube</h1>\n\n<ul>\n\t<!-- open each block -->\n\t\t<li><a target=\"_blank\" href=\"https://www.youtube.com/watch?v={cat.id}\">\n\t\t\t{cat.name}\n\t\t</a></li>\n\t<!-- close each block -->\n</ul>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet cats = [\n\t\t{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },\n\t\t{ id: 'z_AbfPXTKms', name: 'Maru' },\n\t\t{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }\n\t];\n</script>\n\n<h1>The Famous Cats of YouTube</h1>\n\n<ul>\n\t{#each cats as { id, name }, i}\n\t\t<li><a target=\"_blank\" href=\"https://www.youtube.com/watch?v={id}\">\n\t\t\t{i + 1}: {name}\n\t\t</a></li>\n\t{/each}\n</ul>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														'---\ntitle: Each blocks\n---\n\nIf you need to loop over lists of data, use an `each` block:\n\n```html\n<ul>\n\t{#each cats as cat}\n\t\t<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">\n\t\t\t{cat.name}\n\t\t</a></li>\n\t{/each}\n</ul>\n```\n\n> The expression (`cats`, in this case) can be any array or array-like object (i.e. it has a `length` property). You can loop over generic iterables with `each [...iterable]`.\n\nYou can get the current *index* as a second argument, like so:\n\n```html\n{#each cats as cat, i}\n\t<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">\n\t\t{i + 1}: {cat.name}\n\t</a></li>\n{/each}\n```\n\nIf you prefer, you can use destructuring — `each cats as { id, name }` — and replace `cat.id` and `cat.name` with `id` and `name`.',
												},
											],
										},
										{
											name: "05-keyed-each-blocks",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\timport Thing from './Thing.svelte';\n\n\tlet things = [\n\t\t{ id: 1, color: '#0d0887' },\n\t\t{ id: 2, color: '#6a00a8' },\n\t\t{ id: 3, color: '#b12a90' },\n\t\t{ id: 4, color: '#e16462' },\n\t\t{ id: 5, color: '#fca636' }\n\t];\n\n\tfunction handleClick() {\n\t\tthings = things.slice(1);\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tRemove first thing\n</button>\n\n{#each things as thing}\n\t<Thing current={thing.color}/>\n{/each}",
														},
														{
															name: "Thing.svelte",
															is_dir: false,
															content:
																'<script>\n\t// `current` is updated whenever the prop value changes...\n\texport let current;\n\n\t// ...but `initial` is fixed upon initialisation\n\tconst initial = current;\n</script>\n\n<p>\n\t<span style="background-color: {initial}">initial</span>\n\t<span style="background-color: {current}">current</span>\n</p>\n\n<style>\n\tspan {\n\t\tdisplay: inline-block;\n\t\tpadding: 0.2em 0.5em;\n\t\tmargin: 0 0.2em 0.2em 0;\n\t\twidth: 4em;\n\t\ttext-align: center;\n\t\tborder-radius: 0.2em;\n\t\tcolor: white;\n\t}\n</style>',
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\timport Thing from './Thing.svelte';\n\n\tlet things = [\n\t\t{ id: 1, color: '#0d0887' },\n\t\t{ id: 2, color: '#6a00a8' },\n\t\t{ id: 3, color: '#b12a90' },\n\t\t{ id: 4, color: '#e16462' },\n\t\t{ id: 5, color: '#fca636' }\n\t];\n\n\tfunction handleClick() {\n\t\tthings = things.slice(1);\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tRemove first thing\n</button>\n\n{#each things as thing (thing.id)}\n\t<Thing current={thing.color}/>\n{/each}",
														},
														{
															name: "Thing.svelte",
															is_dir: false,
															content:
																'<script>\n\t// `current` is updated whenever the prop value changes...\n\texport let current;\n\n\t// ...but `initial` is fixed upon initialisation\n\tconst initial = current;\n</script>\n\n<p>\n\t<span style="background-color: {initial}">initial</span>\n\t<span style="background-color: {current}">current</span>\n</p>\n\n<style>\n\tspan {\n\t\tdisplay: inline-block;\n\t\tpadding: 0.2em 0.5em;\n\t\tmargin: 0 0.2em 0.2em 0;\n\t\twidth: 4em;\n\t\ttext-align: center;\n\t\tborder-radius: 0.2em;\n\t\tcolor: white;\n\t}\n</style>',
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Keyed each blocks\n---\n\nBy default, when you modify the value of an `each` block, it will add and remove items at the *end* of the block, and update any values that have changed. That might not be what you want.\n\nIt's easier to show why than to explain. Click the 'Remove first thing' button a few times, and notice that it's removing `<Thing>` components from the end and updating the `color` for those that remain. Instead, we'd like to remove the first `<Thing>` component and leave the rest unaffected.\n\nTo do that, we specify a unique identifier for the `each` block:\n\n```html\n{#each things as thing (thing.id)}\n\t<Thing current={thing.color}/>\n{/each}\n```\n\nThe `(thing.id)` tells Svelte how to figure out what changed.\n\n> You can use any object as the key, as Svelte uses a `Map` internally — in other words you could do `(thing)` instead of `(thing.id)`. Using a string or number is generally safer, however, since it means identity persists without referential equality, for example when updating with fresh data from an API server.\n",
												},
											],
										},
										{
											name: "06-await-blocks",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet promise = getRandomNumber();\n\n\tasync function getRandomNumber() {\n\t\tconst res = await fetch(`tutorial/random-number`);\n\t\tconst text = await res.text();\n\n\t\tif (res.ok) {\n\t\t\treturn text;\n\t\t} else {\n\t\t\tthrow new Error(text);\n\t\t}\n\t}\n\n\tfunction handleClick() {\n\t\tpromise = getRandomNumber();\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tgenerate random number\n</button>\n\n<!-- replace this element -->\n<p>{promise}</p>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																'<script>\n\tlet promise = getRandomNumber();\n\n\tasync function getRandomNumber() {\n\t\tconst res = await fetch(`tutorial/random-number`);\n\t\tconst text = await res.text();\n\n\t\tif (res.ok) {\n\t\t\treturn text;\n\t\t} else {\n\t\t\tthrow new Error(text);\n\t\t}\n\t}\n\n\tfunction handleClick() {\n\t\tpromise = getRandomNumber();\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tgenerate random number\n</button>\n\n{#await promise}\n\t<p>...waiting</p>\n{:then number}\n\t<p>The number is {number}</p>\n{:catch error}\n\t<p style="color: red">{error.message}</p>\n{/await}',
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Await blocks\n---\n\nMost web applications have to deal with asynchronous data at some point. Svelte makes it easy to *await* the value of [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) directly in your markup:\n\n```html\n{#await promise}\n\t<p>...waiting</p>\n{:then number}\n\t<p>The number is {number}</p>\n{:catch error}\n\t<p style=\"color: red\">{error.message}</p>\n{/await}\n```\n\n> Only the most recent `promise` is considered, meaning you don't need to worry about race conditions.\n\nIf you know that your promise can't reject, you can omit the `catch` block. You can also omit the first block if you don't want to show anything until the promise resolves:\n\n```html\n{#await promise then value}\n\t<p>the value is {value}</p>\n{/await}\n```",
												},
											],
										},
										{
											name: "meta.json",
											is_dir: false,
											content: '{\n\t"title": "Logic"\n}',
										},
									],
								},
								{
									name: "05-events",
									is_dir: true,
									content: [
										{
											name: "01-dom-events",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet m = { x: 0, y: 0 };\n\n\tfunction handleMousemove(event) {\n\t\tm.x = event.clientX;\n\t\tm.y = event.clientY;\n\t}\n</script>\n\n<style>\n\tdiv { width: 100%; height: 100%; }\n</style>\n\n<div>\n\tThe mouse position is {m.x} x {m.y}\n</div>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet m = { x: 0, y: 0 };\n\n\tfunction handleMousemove(event) {\n\t\tm.x = event.clientX;\n\t\tm.y = event.clientY;\n\t}\n</script>\n\n<style>\n\tdiv { width: 100%; height: 100%; }\n</style>\n\n<div on:mousemove={handleMousemove}>\n\tThe mouse position is {m.x} x {m.y}\n</div>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: DOM events\n---\n\nAs we've briefly seen already, you can listen to any event on an element with the `on:` directive:\n\n```html\n<div on:mousemove={handleMousemove}>\n\tThe mouse position is {m.x} x {m.y}\n</div>\n```",
												},
											],
										},
										{
											name: "02-inline-handlers",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tlet m = { x: 0, y: 0 };\n\n\tfunction handleMousemove(event) {\n\t\tm.x = event.clientX;\n\t\tm.y = event.clientY;\n\t}\n</script>\n\n<style>\n\tdiv { width: 100%; height: 100%; }\n</style>\n\n<div on:mousemove={handleMousemove}>\n\tThe mouse position is {m.x} x {m.y}\n</div>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																'<script>\n\tlet m = { x: 0, y: 0 };\n</script>\n\n<style>\n\tdiv { width: 100%; height: 100%; }\n</style>\n\n<div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">\n\tThe mouse position is {m.x} x {m.y}\n</div>',
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Inline handlers\n---\n\nYou can also declare event handlers inline:\n\n```html\n<div on:mousemove=\"{e => m = { x: e.clientX, y: e.clientY }}\">\n\tThe mouse position is {m.x} x {m.y}\n</div>\n```\n\nThe quote marks are optional, but they're helpful for syntax highlighting in some environments.\n\n> In some frameworks you may see recommendations to avoid inline event handlers for performance reasons, particularly inside loops. That advice doesn't apply to Svelte — the compiler will always do the right thing, whichever form you choose.",
												},
											],
										},
										{
											name: "03-event-modifiers",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tfunction handleClick() {\n\t\talert('clicked')\n\t}\n</script>\n\n<button on:click={handleClick}>\n\tClick me\n</button>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\tfunction handleClick() {\n\t\talert('no more alerts')\n\t}\n</script>\n\n<button on:click|once={handleClick}>\n\tClick me\n</button>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Event modifiers\n---\n\nDOM event handlers can have *modifiers* that alter their behaviour. For example, a handler with a `once` modifier will only run a single time:\n\n```html\n<script>\n\tfunction handleClick() {\n\t\talert('no more alerts')\n\t}\n</script>\n\n<button on:click|once={handleClick}>\n\tClick me\n</button>\n```\n\nThe full list of modifiers:\n\n* `preventDefault` — calls `event.preventDefault()` before running the handler. Useful for client-side form handling, for example.\n* `stopPropagation` — calls `event.stopPropagation()`, preventing the event reaching the next element\n* `passive` — improves scrolling performance on touch/wheel events (Svelte will add it automatically where it's safe to do so)\n* `nonpassive` — explicitly set `passive: false`\n* `capture` — fires the handler during the *capture* phase instead of the *bubbling* phase ([MDN docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture))\n* `once` — remove the handler after the first time it runs\n* `self` — only trigger handler if event.target is the element itself\n\nYou can chain modifiers together, e.g. `on:click|once|capture={...}`.\n",
												},
											],
										},
										{
											name: "04-component-events",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\timport Inner from './Inner.svelte';\n\n\tfunction handleMessage(event) {\n\t\talert(event.detail.text);\n\t}\n</script>\n\n<Inner on:message={handleMessage}/>",
														},
														{
															name: "Inner.svelte",
															is_dir: false,
															content:
																"<script>\n\t// setup code goes here\n\n\tfunction sayHello() {\n\n\t}\n</script>\n\n<button on:click={sayHello}>\n\tClick to say hello\n</button>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\timport Inner from './Inner.svelte';\n\n\tfunction handleMessage(event) {\n\t\talert(event.detail.text);\n\t}\n</script>\n\n<Inner on:message={handleMessage}/>",
														},
														{
															name: "Inner.svelte",
															is_dir: false,
															content:
																"<script>\n\timport { createEventDispatcher } from 'svelte';\n\n\tconst dispatch = createEventDispatcher();\n\n\tfunction sayHello() {\n\t\tdispatch('message', {\n\t\t\ttext: 'Hello!'\n\t\t});\n\t}\n</script>\n\n<button on:click={sayHello}>\n\tClick to say hello\n</button>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Component events\n---\n\nComponents can also dispatch events. To do so, they must create an event dispatcher. Update `Inner.svelte`:\n\n```html\n<script>\n\timport { createEventDispatcher } from 'svelte';\n\n\tconst dispatch = createEventDispatcher();\n\n\tfunction sayHello() {\n\t\tdispatch('message', {\n\t\t\ttext: 'Hello!'\n\t\t});\n\t}\n</script>\n```\n\n> `createEventDispatcher` must be called when the component is first instantiated — you can't do it later inside e.g. a `setTimeout` callback. This links `dispatch` to the component instance.",
												},
											],
										},
										{
											name: "05-event-forwarding",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\timport Outer from './Outer.svelte';\n\n\tfunction handleMessage(event) {\n\t\talert(event.detail.text);\n\t}\n</script>\n\n<Outer on:message={handleMessage}/>",
														},
														{
															name: "Inner.svelte",
															is_dir: false,
															content:
																"<script>\n\timport { createEventDispatcher } from 'svelte';\n\n\tconst dispatch = createEventDispatcher();\n\n\tfunction sayHello() {\n\t\tdispatch('message', {\n\t\t\ttext: 'Hello!'\n\t\t});\n\t}\n</script>\n\n<button on:click={sayHello}>\n\tClick to say hello\n</button>",
														},
														{
															name: "Outer.svelte",
															is_dir: false,
															content:
																"<script>\n\timport Inner from './Inner.svelte';\n</script>\n\n<Inner/>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\timport Outer from './Outer.svelte';\n\n\tfunction handleMessage(event) {\n\t\talert(event.detail.text);\n\t}\n</script>\n\n<Outer on:message={handleMessage}/>",
														},
														{
															name: "Inner.svelte",
															is_dir: false,
															content:
																"<script>\n\timport { createEventDispatcher } from 'svelte';\n\n\tconst dispatch = createEventDispatcher();\n\n\tfunction sayHello() {\n\t\tdispatch('message', {\n\t\t\ttext: 'Hello!'\n\t\t});\n\t}\n</script>\n\n<button on:click={sayHello}>\n\tClick to say hello\n</button>",
														},
														{
															name: "Outer.svelte",
															is_dir: false,
															content:
																"<script>\n\timport Inner from './Inner.svelte';\n</script>\n\n<Inner on:message/>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: Event forwarding\n---\n\nUnlike DOM events, component events don't *bubble*. If you want to listen to an event on some deeply nested component, the intermediate components must *forward* the event.\n\nIn this case, we have the same `App.svelte` and `Inner.svelte` as in the [previous chapter](tutorial/component-events), but there's now an `Outer.svelte` component that contains `<Inner/>`.\n\nOne way we could solve the problem is adding `createEventDispatcher` to `Outer.svelte`, listening for the `message` event, and creating a handler for it:\n\n```html\n<script>\n\timport Inner from './Inner.svelte';\n\timport { createEventDispatcher } from 'svelte';\n\n\tconst dispatch = createEventDispatcher();\n\n\tfunction forward(event) {\n\t\tdispatch('message', event.detail);\n\t}\n</script>\n\n<Inner on:message={forward}/>\n```\n\nBut that's a lot of code to write, so Svelte gives us an equivalent shorthand — an `on:message` event directive without a value means 'forward all `message` events'.\n\n```html\n<script>\n\timport Inner from './Inner.svelte';\n</script>\n\n<Inner on:message/>\n```",
												},
											],
										},
										{
											name: "06-dom-event-forwarding",
											is_dir: true,
											content: [
												{
													name: "app-a",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\timport CustomButton from './CustomButton.svelte';\n\n\tfunction handleClick() {\n\t\talert('clicked');\n\t}\n</script>\n\n<CustomButton on:click={handleClick}/>",
														},
														{
															name: "CustomButton.svelte",
															is_dir: false,
															content:
																"<style>\n\tbutton {\n\t\theight: 4rem;\n\t\twidth: 8rem;\n\t\tbackground-color: #aaa;\n\t\tborder-color: #f1c40f;\n\t\tcolor: #f1c40f;\n\t\tfont-size: 1.25rem;\n\t\tbackground-image: linear-gradient(45deg, #f1c40f 50%, transparent 50%);\n\t\tbackground-position: 100%;\n\t\tbackground-size: 400%;\n\t\ttransition: background 300ms ease-in-out;\n\t}\n\tbutton:hover {\n\t\tbackground-position: 0;\n\t\tcolor: #aaa;\n\t}\n</style>\n\n<button>\n\tClick me\n</button>",
														},
													],
												},
												{
													name: "app-b",
													is_dir: true,
													content: [
														{
															name: "App.svelte",
															is_dir: false,
															content:
																"<script>\n\timport CustomButton from './CustomButton.svelte';\n\n\tfunction handleClick() {\n\t\talert('clicked');\n\t}\n</script>\n\n<CustomButton on:click={handleClick}/>",
														},
														{
															name: "CustomButton.svelte",
															is_dir: false,
															content:
																"<style>\n\tbutton {\n\t\theight: 4rem;\n\t\twidth: 8rem;\n\t\tbackground-color: #aaa;\n\t\tborder-color: #f1c40f;\n\t\tcolor: #f1c40f;\n\t\tfont-size: 1.25rem;\n\t\tbackground-image: linear-gradient(45deg, #f1c40f 50%, transparent 50%);\n\t\tbackground-position: 100%;\n\t\tbackground-size: 400%;\n\t\ttransition: background 300ms ease-in-out;\n\t}\n\tbutton:hover {\n\t\tbackground-position: 0;\n\t\tcolor: #aaa;\n\t}\n</style>\n\n<button on:click>\n\tClick me\n</button>",
														},
													],
												},
												{
													name: "text.md",
													is_dir: false,
													content:
														"---\ntitle: DOM event forwarding\n---\n\nEvent forwarding works for DOM events too.\n\nWe want to get notified of clicks on our `<CustomButton>` — to do that, we just need to forward `click` events on the `<button>` element in `CustomButton.svelte`:\n\n```html\n<button on:click>\n\tClick me\n</button>\n```",
												},
											],
										},
										{
											name: "meta.json",
											is_dir: false,
											content: '{\n\t"title": "Events"\n}',
										},
									],
								},
							],
						},
					],
				},
			],
		},
	],
};
