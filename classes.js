class Sprite {
    constructor({ position, velocity, image, frames = { max: 1}, sprites }) // Khởi tạo giá trị biến frames có giá trị mặc định là 1
    {
        this.position = position;
        this.image = image;
        this.frames = {...frames, val: 0, elapsed: 0};
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
        this.moving = false;
        this.sprites = sprites;
    }

    draw() {
        // c.drawImage(this.image, this.position.x, this.position.y); 
        c.drawImage(
            this.image,
            this.frames.val * this.width, // Toạ độ của image player
            0, // Toạ độ của image bên trên
            this.image.width / this.frames.max, // 4 image chia 4 lấy 1 image
            this.image.height, //Chiều cao của player giữ nguyên
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max, // Toạ độ vị trí dọc của image 1
            this.image.height,  // Toạ độ vị trí ngang của image 1
        );
        if (!this.moving) return
            if (this.frames.max > 1) {
                this.frames.elapsed++;
            }
    
            if (this.frames.elapsed % 10 === 0) {
                if (this.frames.val < this.frames.max - 1) {
                    this.frames.val++;
                } else this.frames.val = 0;
            }
    }
}


class Boundary {
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position;
        this.width = 48; // vì chiều dài của 1 ô trong map là 12px => do collisionsMap lấy ra phân nửa map nên ta nhân 2 => 24 + thêm 24 ở dưới
        this.height = 48; // như trên
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.0)'; // Ẩn màu đỏ của collision
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}