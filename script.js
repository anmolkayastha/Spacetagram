// DOM Selector
const postContainer = document.getElementById('post-container');

// Fetch posts from API
async function getPosts() {
    // API key
    const apiKey = "K0jtIEBQqnpAMzwS1tgGi65URZpe3XMVJ9SU9SaK";

    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);   // Astronomy Picture of the Day

    const data = await res.json();
  
    showPosts(data);
  }

  // Create the necessary HTML elements for one post
    // Could probably make a function to reduce redundant code
    // Too big a function

  async function showPosts(data)
  { 
    // Creating a div for one post
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postContainer.appendChild(postEl);
    
    // Adding image
    let imageEl = document.createElement('img');
    imageEl.classList.add('border-radius-top-15');
    imageEl.src = `${data.url}`;
    imageEl.alt = "NASA Image";
    postEl.appendChild(imageEl);

    // Creating post body
    // Contains post title date and post explanation
    const postBodyEl = document.createElement('div');
    postBodyEl.classList.add('post-body');
    postBodyEl.classList.add('border-radius-bottom-15');
    postEl.appendChild(postBodyEl);

    // Post Title
    const postTitleEl = document.createElement('p');
    const postTitle = document.createTextNode(`${data.title}`);
    postTitleEl.classList.add('post-title');
    postTitleEl.appendChild(postTitle);
    postBodyEl.appendChild(postTitleEl);

    // Post Date
    const postDateEl = document.createElement('p');
    const postDate = document.createTextNode(`${data.date}`);
    postDateEl.appendChild(postDate);
    postBodyEl.appendChild(postDateEl);

    // Post text
    const postTextEl = document.createElement('p');
    const postText = document.createTextNode(`${data.explanation}`);
    postTextEl.appendChild(postText);
    postBodyEl.appendChild(postTextEl);

    // Add like button
    const likeBtnEl = document.createElement('button');
    likeBtnEl.classList.add('btn');
    likeBtnEl.setAttribute('id', 'like');
    likeBtnEl.innerHTML = 'Like';
    postBodyEl.appendChild(likeBtnEl);

    // Event listener for like button
    const likeBtn = document.getElementById('like');
    likeBtn.addEventListener("click", function()
    {
      like(likeBtnEl);
    });
    
    // Add share button
    const shareBtnEl = document.createElement('button');
    shareBtnEl.setAttribute('id', 'share');
    shareBtnEl.classList.add('btn');
    shareBtnEl.innerHTML = 'Share';
    postBodyEl.appendChild(shareBtnEl);

    const shareBtn = document.getElementById('share');
    
    // Event listener for getting shareable link
    shareBtn.addEventListener("click", function () {
      shareLink(shareBtnEl, data, postBodyEl);

    }); 
    
  }

  // Calling getposts function
  getPosts();



  // Like button toggle
  function like(likeBtnEl)
  {
    console.log("like button class init...");
    likeBtnEl.classList.toggle("like");
  }


  // Enables shareable image link
  // Relies on getpost function for parameters
  function shareLink(shareBtnEl, data, postBodyEl)
  {
    const imgLinkEl = document.createElement('a');
    const imgLinkText = document.createTextNode(`${data.url}`);
    imgLinkEl.classList.add('link');
    imgLinkEl.appendChild(imgLinkText);
    postBodyEl.appendChild(imgLinkEl);
    shareBtnEl.disabled = true;   // Avoid generating link multiple times
  } 