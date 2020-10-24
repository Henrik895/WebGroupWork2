function addPost(post) {
    let postContainer = document.createElement('div')
    postContainer.className = 'post'

    let postAuthor = document.createElement('div')
    postAuthor.className = 'post-author'
    postContainer.appendChild(postAuthor)

    let postAuthorInfo = document.createElement("span")
    postAuthorInfo.className = 'post-author-info'


    let postAvatar = document.createElement('img')
    postAvatar.src = post['author']['avatar']
    postAvatar.alt = 'Post author'
    postAuthorInfo.appendChild(postAvatar)

    let postAuthorName = document.createElement('small')
    postAuthorName.innerText = post['author']['firstname'] + " " + post['author']['lastname']
    postAuthorInfo.appendChild(postAuthorName)
    postAuthor.appendChild(postAuthorInfo)

    let postCreatetime = document.createElement('small')
    postCreatetime.innerText = post['createTime']
    postAuthor.appendChild(postCreatetime)


    if (post['media']){
        if (post['media']['type'] === "image"){
            let postImageDiv = document.createElement('div')
            postImageDiv.className = 'post-image'
            postContainer.append(postImageDiv)

            let postImage = document.createElement('img')
            postImage.src = post['media']['url']
            postImage.alt = 'image'
            postImageDiv.appendChild(postImage)
        } else if (post['media']['type'] === "video"){
            let postVideoDiv = document.createElement('div')
            postVideoDiv.className = 'post-video'
            postContainer.append(postVideoDiv)

            let postVideo = document.createElement('video')
            postVideo.controls = true
            postVideo.src = post['media']['url']
            postVideo.alt = 'video'
            postVideo.innerText = "Video could not be loaded"
            postVideoDiv.appendChild(postVideo)
        }
    }

    let postTitle = document.createElement('div') //this div needs to bee added even if there is no text on the post
    postTitle.className = 'post-title'                    //or the original css doesnt apply padding to the post-actions div........
    postContainer.appendChild(postTitle)

    if (post['text']){
        let postText = document.createElement('h3')
        postText.innerText = post['text']
        postTitle.append(postText)
    }

    let postActions = document.createElement('div')
    postActions.className = 'post-actions'
    postContainer.appendChild(postActions)

    let likeButton = document.createElement('button')
    likeButton.className = 'like-button'
    likeButton.name = 'like'
    likeButton.innerText = post['likes']
    postActions.appendChild(likeButton)

    $(".main-container").append(postContainer);
}

function addPosts(posts){
    for (let i = 0; i < posts.length; i++) {
        addPost(posts[i])
    }
}

function fetchPosts() {
    $.get(
        {
            url: 'https://private-anon-2c32e94f5a-wad20postit.apiary-mock.com/posts',
            success: function(data) {
                addPosts(data)
            },
            error: function() {
                alert('Error fetching posts.');
            }
        }
    );
}

$(document).ready(function(){
    fetchPosts()
    $(document).click(".like-button", function(event){ //Attaching the onclick listener to the document ensures that any new buttons created by fetchPosts() also have the listener.
        $(event.target).toggleClass("liked")
    });
});
