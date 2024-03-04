const loadData = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json()
    const posts = data.posts
    loadSinglePost(posts)    
}

function loadSinglePost(posts){
    posts.forEach(post =>{
        const letsDiscussPost = document.getElementById('lets-discuss-posts')
        const card = document.createElement('div')
        card.classList = `p-5 lg:p-10 rounded-3xl bg-[#F3F3F5] flex justify-between items-start gap-5 sm:flex-row flex-col`
        card.innerHTML = `
        <div class="avatar ${isActive(post.isActive)} relative w-[65px]"><img class="w-full rounded-xl" src="${post.image}"></div>
        <div class="flex-1">
            <div class="flex gap-5 text-[#12132DCC] font-inter text-sm font-medium"><p># <span>${post.category}</span></p> <p>Author : ${post.author.name}</p></div>
            <h1 class="font-mulish font-bold text-xl mb-3">${post.title}</h1>
            <p class="text-[#12132D99] font-inter">${post.description}</p>
            <hr class="border-dashed border-[#12132D40] my-4">
            <div class="flex justify-between items-center">
                <div class="flex gap-3 sm:gap-7 items-center text-[#12132D99] font-inter">
                    <p><i class="fa-regular fa-comment-dots"></i> <span>${post.comment_count}</span></p>
                    <p><i class="fa-regular fa-eye"></i> <span>1,568</span>${post.view_count}</p>
                    <p><i class="fa-regular fa-clock"></i> <span>${post.posted_time} min</span></p>
                </div>
                <div class="cursor-pointer"><img src="images/mail.png"></div>
            </div>
        </div>
        `
        letsDiscussPost.appendChild(card)
        console.log(post)
    })
}

loadData()