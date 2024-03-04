const loadData = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json()
    const posts = data.posts
    loadSinglePost(posts)    
}

function loadSinglePost(posts){
    posts.forEach(post =>{
        const title = post.title
        const image = post.image
        const isActive = post.isActive
        const category = post.category
        const author = post.author.name
        const description = post.description
        const comments = post.comment_count
        const views = post.view_count
        const time = post.posted_time
        discussPosts(title, image, isActive, category, author, description,comments, views, time)
        // createMarkAsRead(title, views)
        console.log(post)
    })
}
let i = 1
loadData()
function discussPosts(title, image, isActive, category, author, description,comments, views, time){
    const letsDiscussPost = document.getElementById('lets-discuss-posts')
    const card = document.createElement('div')
    card.classList = `p-5 lg:p-10 rounded-3xl bg-[#F3F3F5] flex justify-between items-start gap-5 sm:flex-row flex-col`
    card.innerHTML = `
    <div class="avatar ${checkActive(isActive)} relative w-[65px]"><img class="w-full rounded-xl" src="${image}"></div>
    <div class="flex-1">
        <div class="flex gap-5 text-[#12132DCC] font-inter text-sm font-medium"><p># <span>${category}</span></p> <p>Author : ${author}</p></div>
        <h1 class="font-mulish font-bold text-xl mb-3">${title}</h1>
        <p class="text-[#12132D99] font-inter">${description}</p>
        <hr class="border-dashed border-[#12132D40] my-4">
        <div class="flex justify-between items-center">
            <div class="flex gap-3 sm:gap-7 items-center text-[#12132D99] font-inter">
                <p><i class="fa-regular fa-comment-dots"></i> <span>${comments}</span></p>
                <p><i class="fa-regular fa-eye"></i> <span>${views}</span></p>
                <p><i class="fa-regular fa-clock"></i> <span>${time} min</span></p>
            </div>
            <div id = "mark-as-read-${i}" class="cursor-pointer"><img src="images/mail.png"></div>
        </div>
    </div>
    `
    letsDiscussPost.appendChild(card)
    markAsReadClicked(`mark-as-read-${i}`, title, views)
    i++
}


const markAsRead = document.getElementById('mark-as-read')
function markAsReadClicked(markAsReadItemId, title, views){
    const markAsReadItem = document.getElementById(markAsReadItemId)
    markAsReadItem.addEventListener('click', function(){
        const item = document.createElement('div')
        item.classList = ('p-4 bg-white rounded-2xl flex justify-between items-center gap-3')
        item.innerHTML = `
        <h4 class="font-mulish font-semibold ">${title}</h4>
        <p class="text-[#12132D99] font-inter font-medium flex gap-2 items-center"><i class="fa-regular fa-eye"></i> <span>${views}</span></p>
        `
        markAsRead.appendChild(item)
    })
}





















