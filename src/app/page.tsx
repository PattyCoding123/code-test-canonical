import styles from "./page.module.scss";

const ENDPOINT_URL =
  "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json";

// Function to get all blog posts from the wordpress API
async function getAllBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch(ENDPOINT_URL);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  // Return the data as JSON and type as BlogPost (from types.d.ts)
  const data: BlogPost[] = await response.json();

  return data;
}

export default async function Home() {
  // Await blog posts from the API
  const blogPosts = await getAllBlogPosts();

  // Function to capitalize the first letter of a string
  const capitalizeString = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    // Add some main padding just for the demo
    <main className="row" style={{ padding: "1rem" }}>
      {blogPosts.map((post) => {
        /**
         * For each post, get the author, date, category and tag
         * and display them in the card
         */
        const author = post._embedded.author.at(0)?.name;
        const authorLink = post._embedded.author.at(0)?.link;
        const date = new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(post.date));
        const category = post._embedded["wp:term"][0][0].name;
        const tag = capitalizeString(post._embedded["wp:term"][1][0].name);

        return (
          // Create a card for each post, use col-4 for the width of the card in grid
          <div key={post.id} className="col-4">
            <div className={`p-card ${styles.card}`}>
              <div className="p-card__content">
                <p>{tag.toUpperCase()}</p>
                <hr className={`is-muted ${styles.hr}`} />
                <img
                  className="p-card__image"
                  style={{ width: "90%", margin: "0 auto" }}
                  alt="Picture"
                  src={post.featured_media}
                />
                <h4>
                  <a href={post.link}>{post.title.rendered}</a>
                </h4>
                <p className="p-heading--6">
                  By <a href={authorLink}>{author}</a> on {date}
                </p>
                <hr className={`is-muted ${styles.hr}`} />
                {category === "Articles" ? <p>Article</p> : null}
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
}
