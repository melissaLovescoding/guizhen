// 点击 surpriseButton 后显示隐藏的 surprise div，并显示“点击14次”按钮
document.getElementById("surpriseButton").addEventListener("click", function() {
    var surpriseDiv = document.getElementById("surprise");
    
    // 如果 surprise 是隐藏的，就显示出来
    if (surpriseDiv.classList.contains("hidden")) {
        surpriseDiv.classList.remove("hidden");
        document.getElementById("click14Button").classList.remove("hidden");
    } else {
        surpriseDiv.classList.add("hidden");
    }

    // 背景颜色变化
    setInterval(changeBackgroundColor, 2500);
});

var clickCount = 0;

// 监听 click14Button 的点击事件
document.getElementById("click14Button").addEventListener("click", function() {
    clickCount++;
    if (clickCount >= 14) {
        // 14次点击后，隐藏视频，显示音频
        var video = document.getElementById("birthdayVideo");
        video.pause(); // 暂停视频
        video.classList.add("hidden");

        // 播放音频
        var audio = document.getElementById("audioSurprise");
        audio.play();
        
    }
});

// 背景颜色变化函数
function changeBackgroundColor() {
    var colors = ["#FFB6C1", "#FF1493", "#FF69B4", "#FFC0CB", "#FF6347"];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}

// 视频控制函数
function playVideo() {
    var video = document.getElementById("birthdayVideo");
    video.muted = false;
    video.volume = 1.0;
    video.play();
}

function stopVideo() {
    var video = document.getElementById("birthdayVideo");
    video.pause();
}

function restartVideo() {
    var video = document.getElementById("birthdayVideo");
    video.currentTime = 0;
    video.play();
}


// 删除所需的密码
const adminPassword = "1410";

// 生日愿望提交
document.getElementById("submitWish").addEventListener("click", function() {
    var wishInput = document.getElementById("wishInput");
    var wishText = wishInput.value.trim();
    if (wishText !== "") {
        addWishToWall(wishText); // 保持这个函数调用
        saveWish(wishText);      // 保存到LocalStorage
        wishInput.value = "";    // 清空输入框
    }
});

// 从 LocalStorage 加载愿望
window.onload = function() {
    loadWishes();
};

// 将愿望添加到墙上
function addWishToWall(wishText) {
    var wishDiv = document.createElement("div");
    wishDiv.className = "wish";
    wishDiv.textContent = wishText;

    // 创建删除按钮
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.style.marginLeft = "10px";
    
    // 为删除按钮添加点击事件
    deleteButton.onclick = function() {
		var enteredPassword = prompt("Please enter code to delete this wish:");
		// 检查密码是否正确
        if (enteredPassword === adminPassword) {
            // 如果密码正确，允许删除愿望
            document.getElementById("wishes").removeChild(wishDiv);
            deleteWish(wishText); // 从LocalStorage中删除愿望
            alert("This wish is deleted.");
        } else {
            // 密码错误，提示用户
            alert("This code is wrong, you can't delete it!");
        }
    };

    // 将删除按钮添加到 wishDiv
    wishDiv.appendChild(deleteButton);

    // 将 wishDiv 添加到愿望墙
    document.getElementById("wishes").appendChild(wishDiv);
}

// 保存愿望到 LocalStorage
function saveWish(wishText) {
    var wishes = JSON.parse(localStorage.getItem("wishes")) || [];
    wishes.push(wishText);
    localStorage.setItem("wishes", JSON.stringify(wishes));
}

// 从 LocalStorage 加载愿望
function loadWishes() {
    var wishes = JSON.parse(localStorage.getItem("wishes")) || [];
    wishes.forEach(function(wishText) {
        addWishToWall(wishText);
    });
}

// 删除愿望并从LocalStorage中移除
function deleteWish(wishText) {
    // 从 LocalStorage 中删除愿望
    var wishes = JSON.parse(localStorage.getItem("wishes")) || [];
    var updatedWishes = wishes.filter(function(wish) {
        return wish !== wishText; // 保留所有与 wishText 不匹配的愿望
    });
    localStorage.setItem("wishes", JSON.stringify(updatedWishes));
}
