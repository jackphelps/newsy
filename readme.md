Newsy
===========
A news-focused Ghost theme
 * fully responsive
 * sexy shrinking nav bar
 * integrated search
 * Disqus integrated for commenting
 * SEO + social optimized out of the box
 * SUPER easy to work with
 * built with bootstrap, jquery, and less

As seen on http://citationsneeded.com

Why make this?
==============

I have been incredibly frustrated with most of the themes I've seen or purchased for CMS like Wordpress and Ghost. They look good out of the box, but are usually unbelievably fragile, cluttered, overly complicated, and hard to tweak. In keeping with Ghost's goals, I thought it needed something simple, universal, and easy to work with.

Newsy has a simple and clear set of configurations: it's all based on bootstrap + less with a clearly documented set of overrides to bootstrap's defaults, so you won't need to wade through tons of confusing CSS to customize something, and you'll never break any of the underlying elegance by tweaking some stuff here and there. It ships with less.js included so you can tweak the variables easily, and compile when you're ready for production.


!Important!
==============
The following items are what needs to be customized when you're setting this up on your own. Use this as a checklist, else you might miss some important things.
* Colors & CSS: for development, the theme is set to use uncompiled less variables, so tweak this stuff in css/vars.less.
* set up all of ghost's predefined inputs (title, subtitle, users, etc.) and drop some real content in for content-first designing
* "featured images" for each post are scraped out of the post body using ghost's provided content=0 handlebars excerpting and laid into the page 
  in main.js. They're simple to use -- just put a wide image (1000x300 or 1000x500) at the top of each post, and include the post's "subtitle"
  in the image's alt (in the image's brackets in ghost's markdown editor). 
* the one caveat for subtitles in the alt is that you cannot use single or double quotes or ghost will break. Instead, use the character
  codes \&rsquo; for single quotes or apostrophes, or \&rdquo; and \&ldquo; for double quotes (right and left respectively)
* add a logo or use the default css-based 3D text formatting provided
* star your 'featured' posts so they appear in the sidebar
* compile less [directions to follow]
* add a favicon
* plug in your own API keys for the following:
  * twitter (@username)
  * google analytics
  * disqus
  * tapir (search)

And you're set to go!