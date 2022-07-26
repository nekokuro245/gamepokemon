const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

// c.fillStyle = 'white';
// c.fillRect(0, 0, canvas.width, canvas.height);

const collisionsMap = []
let arrayLength = collisions.length; // Mục đích cắt map dựa trên Json, với chiều dài của phân nửa map là 70
for (let i = 0; i < arrayLength; i+=70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
}

const boundaries = [];
const offset = {
    x: -735,
    y: -650
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) // Mục đích chỉ lấy ra vị trí của boundaries là 1025 tức là vật cản mà ta mong muốn
        boundaries.push(new Boundary({
            position: {
                x: j * Boundary.width + offset.x, // j là index của từng phần tử ở 1 dòng trong mảng
                y: i * Boundary.height + offset.y // i là index của từng phần tử ở trên 1 dòng trong mảng
            }
        }))
    })
})

// console.log(boundaries)

const image = new Image();
image.src = './img/Pellet Town.png';

const foregroundImage = new Image();
foregroundImage.src = './img/foregroundObjects.png';

const playerDownImage = new Image();
playerDownImage.src = './img/playerDown.png';

const playerUpImage = new Image();
playerUpImage.src = './img/playerUp.png';

const playerLeftImage = new Image();
playerLeftImage.src = './img/playerLeft.png';

const playerRightImage = new Image();
playerRightImage.src = './img/playerRight.png';


// canvas.width / 2 - (this.image.width / 4) / 2, // Toạ độ trục ngang 4 image 
// canvas.height / 2 - this.image.width / 2, //  Toạ độ trục dọc 4 image

let widthPlayer = 192;
let heightPlayer = 68;
const player = new Sprite({
    position: {
       
        x: canvas.width / 2 - widthPlayer / 4 / 2, // Toạ độ trục ngang 4 image 
        y: canvas.height / 2 - heightPlayer / 2 //  Toạ độ trục dọc 4 image
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    }
})

console.log(player.position.x);

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
});

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
});

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

// const testBoundary = new Boundary({
//     position: {
//         x: 400,
//         y: 400
//     }
// })

const moveAbles = [background, ...boundaries, foreground]; //testBoundary

function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x // Nếu vị trí x của player + độ dài width của player lớn hơn hoặc bằng collision vị trí x => trả về true
        && rectangle1.position.x <= rectangle2.position.x + rectangle2.width 
        && rectangle1.position.y <= rectangle2.position.y + rectangle2.height
        && rectangle1.position.y + rectangle1.height >= rectangle2.position.y // Nếu vị trí y  của player + độ cao height của player lớn hơn hoặc bằng collision vị trí y => trả về true
    ) // Hàm bắt sự kiện va chạm
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw();
    })
    // testBoundary.draw();
    player.draw();
    foreground.draw();

    let moving = true; // Tạo biến flag moving mặc định true
    player.moving = false; // Tạo flag để bắt sự kiện
    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true;
        player.image = player.sprites.up;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }}
                }))
            {
                console.log("Đã chạm nhau")
                moving = false;
                break
            }
        }

        if(moving) // nếu moving true thì khi ấn w moveAble sẽ cộng y lên 3
        moveAbles.forEach(movable => {
            movable.position.y += 3;
        }) 
        // background.position.y += 3; 
        // testBoundary.position.y += 3;
    }
    else if (keys.a.pressed && lastKey === 'a') { 
        player.moving = true;
        player.image = player.sprites.left;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }}
                }))
            {
                console.log("Đã chạm nhau")
                moving = false;
                break
            }
        }

        if(moving) // nếu moving true thì khi ấn w moveAble sẽ cộng x lên 3
        moveAbles.forEach(movable => {
            movable.position.x += 3;
        }) 
        // background.position.x += 3; 
        // testBoundary.position.x += 3;
    }
    else if (keys.s.pressed && lastKey === 's') { 
        player.moving = true;
        player.image = player.sprites.down;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }}
                }))
            {
                console.log("Đã chạm nhau")
                moving = false;
                break
            }
        }

        if(moving) // nếu moving true thì khi ấn w moveAble sẽ cộng y lên 3
        moveAbles.forEach(movable => {
            movable.position.y -= 3;
        })
        // background.position.y -= 3; 
        // testBoundary.position.y -= 3;
    }
    else if (keys.d.pressed && lastKey === 'd') { 
        player.moving = true;
        player.image = player.sprites.right;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }}
                }))
            {
                console.log("Đã chạm nhau")
                moving = false;
                break
            }
        }

        if(moving) // nếu moving true thì khi ấn w moveAble sẽ cộng y lên 3
        moveAbles.forEach(movable => {
            movable.position.x -= 3;
        })
        // background.position.x -= 3; 
        // testBoundary.position.x -= 3;
    }
}
animate();

let lastKey = '';
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});


//2:50:51