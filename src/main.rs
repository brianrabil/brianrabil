use axum::{routing::get, Router};
use maud::{html, Markup, DOCTYPE};

fn page(content: Markup) -> Markup {
    html! {
        (DOCTYPE)
        head {
            meta charset="UTF-8" {}
            title { "My Portfolio" }
            script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp" {}
            script src="https://unpkg.com/htmx.org@1.9.10" {}
        }
        body class="prose bg-white dark:text-white dark:bg-black mx-auto max-w-2xl p-4" {
            header class="p-4" {
                h1 class="text-3xl text-black dark:text-white font-bold" { "Brian Rabil" }
                p class="text-xl" { "Software Engineer | Rust Enthusiast | Open Source Contributor" }
                nav {
                    ul class="flex space-x-4 text-black dark:text-white" {
                        li { a href="/" { "Home" } }
                        li { a class="text-white dark:text-blue-200" href="/blog" { "Blog" } }
                        li { a class="text-black dark:text-white" href="/projects" { "Projects" } }
                        li { a href="/about" { "About" } }
                        li { a href="/contact" { "Contact" } }
                    }
                }
            }
            main id="main" {
                (content)
            }
            footer {
                p class="text-center mt-4" {
                    "© 2023 Brian Rabil - All rights reserved."
                }
                a href="rss.atom" { "RSS Feed" }
            }
        }
    }
}

async fn home() -> Markup {
    page(html! {
        h1 class="text-4xl text-black dark:text-white font-bold underline" { "My Portfolio" }

        p { "Welcome to my portfolio website. Here you can find information about my projects, skills, and professional experience." }

        h2 class="text-2xl font-bold mt-4" { "Projects" }
        ul class="list-disc pl-5" {
            li { "Project 1: Description of project 1." }
            li { "Project 2: Description of project 2." }
            li { "Project 3: Description of project 3." }
        }

        h2 class="text-2xl font-bold mt-4" { "Skills" }
        ul class="list-disc pl-5" {
            li { "Language: Rust" }
            li { "Web Development: Axum, HTML, CSS" }
            li { "Version Control: Git" }
        }

        h2 class="text-2xl font-bold mt-4" { "Experience" }
        ul class="list-disc pl-5" {
            li { "Company A: Role - Description of role and responsibilities." }
            li { "Company B: Role - Description of role and responsibilities." }
            li { "Company C: Role - Description of role and responsibilities." }
        }

        h2 class="text-2xl font-bold mt-4" { "Education" }
        p { "Bachelor's Degree in Computer Science - University Name, Year of Graduation" }

        h2 class="text-2xl font-bold mt-4" { "Contact Me" }
        form method="post" action="/contact" {
            input type="text" name="name" placeholder="Your Name" class="border p-2 rounded" required {}
            input type="email" name="email" placeholder="Your Email" class="border p-2 rounded mt-2" required {}
            textarea name="message" placeholder="Your Message" class="border p-2 rounded mt-2" required {}
            button type="submit" class="bg-blue-500 text-white p-2 rounded mt-2" { "Send Message" }
        }
    })
}

async fn projects() -> Markup {
    page(html! {
        h1 class="text-4xl font-bold underline" { "Projects" }

        h2 class="text-2xl font-bold mt-4" { "Project 1" }
        p { "Description of project 1." }

        h2 class="text-2xl font-bold mt-4" { "Project 2" }
        p { "Description of project 2." }

        h2 class="text-2xl font-bold mt-4" { "Project 3" }
        p { "Description of project 3." }
    })
}

async fn blog() -> Markup {
    page(html! {
        h1 class="text-4xl font-bold underline" { "Blog" }

        h2 class="text-2xl font-bold mt-4" { "Post 1" }
        p { "Content of post 1." }

        h2 class="text-2xl font-bold mt-4" { "Post 2" }
        p { "Content of post 2." }

        h2 class="text-2xl font-bold mt-4" { "Post 3" }
        p { "Content of post 3." }
    })
}

async fn about() -> Markup {
    page(html! {
        h1 class="text-4xl font-bold underline" { "About Me" }

        p { "I am a software engineer with a passion for Rust and open source. I have experience in web development, systems programming, and distributed systems." }
    })
}

async fn contact() -> Markup {
    page(html! {
        h1 class="text-4xl font-bold underline" { "Contact Me" }

        form method="post" action="/contact" {
            input type="text" name="name" placeholder="Your Name" class="border p-2 rounded" required {}
            input type="email" name="email" placeholder="Your Email" class="border p-2 rounded mt-2" required {}
            textarea name="message" placeholder="Your Message" class="border p-2 rounded mt-2" required {}
            button type="submit" class="bg-blue-500 text-white p-2 rounded mt-2" { "Send Message" }
        }
    })
}

#[tokio::main]
async fn main() {
    // build our application with a single route
    let app = Router::new()
        .route("/", get(home))
        .route("/projects", get(projects))
        .route("/blog", get(blog))
        .route("/about", get(about))
        .route("/contact", get(contact));

    // run it with hyper on localhost:3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();

    axum::serve(listener, app.into_make_service())
        .await
        .unwrap();
}
