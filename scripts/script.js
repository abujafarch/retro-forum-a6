// let's discuss section here 
const loadData = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json()
    const posts = data.posts
    loadSinglePost(posts)    
}

const letsDiscussPost = document.getElementById('lets-discuss-posts')
function loadSinglePost(posts){
    letsDiscussPost.innerHTML = ''
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
loadData()
let i = 1
function discussPosts(title, image, isActive, category, author, description,comments, views, time){
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
const markAsCount = document.getElementById('mark-as-count')
let n = 0;
function markAsReadClicked(markAsReadItemId, title, views){
    const markAsReadItem = document.getElementById(markAsReadItemId)
    let isTrue = true;
    markAsReadItem.addEventListener('click', function(){
        if(isTrue){
            const item = document.createElement('div')
            item.classList = ('p-4 bg-white rounded-2xl flex justify-between items-center gap-3')
            item.innerHTML = `
            <h4 class="font-mulish font-semibold ">${title}</h4>
            <p class="text-[#12132D99] font-inter font-medium flex gap-2 items-center"><i class="fa-regular fa-eye"></i> <span>${views}</span></p>
            `
            markAsRead.appendChild(item)
            n++
            markAsCount.innerText = n
            }
        isTrue = false;
    })    
}


const loadLatestPost = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json()
    data.forEach(post=>{
        const title = post.title
        const coverImage = post.cover_image
        const author = post.author.name
        const designation = post.author.designation
        const date = post.author.posted_date
        const profileImage = post.profile_image
        const description = post.description
        latestPost(title, coverImage, author, designation, date, profileImage, description)
    })
    console.log(data)
}
loadLatestPost()

const latestPosts = document.getElementById('latest-posts')
function latestPost(title, coverImage, author, designation, date, profileImage, description){
    const post = document.createElement('div')
    post.classList = ('sm:p-6 p-4 min-w-[320px] flex-1 border-[1px] border-[#12132D26] rounded-3xl font-mulish')
    post.innerHTML = `
        <img src="${coverImage}" class="w-full rounded-3xl">
        <p class="font-medium text-[#12132D99] my-4"><i class="fa-regular fa-calendar"></i> ${date = date ? date : "No publish date"}</p>
        <h4 class="text-[#12132D] font-extrabold text-lg mb-2">${title}</h4>
        <p class="text-[#12132D99] font-medium mb-4">${description} </p>
        <div class="flex gap-4 items-center">
            <img src="${profileImage}" class="rounded-full w-11">
            <div><p class="font-bold text-[#12132D]">${author}</p> <p class="text-[#12132D99] font-medium">${designation = designation ? designation : "Unknown"}</p></div>
        </div>
    `
    latestPosts.appendChild(post)
}

const showBySearch = async (searchValue)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchValue}`)
    const data = await res.json()
    const posts = data.posts    
    loadSinglePost(posts)
}

function getSearchInput(){
    const searchInput = document.getElementById('search-input')
    const searchBtn = document.getElementById('search-btn')
    const searchValue = searchInput.value
    showBySearch(searchValue)
    console.log(searchValue)
}

















