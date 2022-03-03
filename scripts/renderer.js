class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        //draw rectangle
        let left_bottom = new Object({x: 100 , y: 100});
        let right_top = new Object({x: 200, y: 200});
        let color = [255, 0, 255, 255];
        this.drawRectangle(left_bottom, right_top, color, ctx);       
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        //draw circle
        let center = new Object({x: 200, y: 200});
        let radius = 100;
        let color = [255, 0 , 0, 255];
        this.drawCircle(center, radius, color, ctx);


    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        // draw bezier curve
        let pt0 = new Object({x: 100, y: 100});
        let pt1 = new Object({x: 500, y: 250});
        let pt2 = new Object({x: 100, y: 500});
        let pt3 = new Object({x: 300, y: 100});
        let color = [0, 0, 255, 255];
        this.drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx);

    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        //draw name
        let color = [128, 128, 128, 255];
        //M
        this.drawBezierCurve(new Object({x: 50, y: 100}), new Object({x: 50, y: 600}), new Object({x: 100, y: 600}), new Object({x: 100, y: 250}), color, ctx);
        this.drawBezierCurve(new Object({x: 100, y: 250}), new Object({x: 100, y: 600}), new Object({x: 150, y: 600}), new Object({x: 150, y: 100}), color, ctx);
        //i
        this.drawBezierCurve(new Object({x: 190, y: 110}), new Object({x: 330, y: 350}), new Object({x: 130, y: 350}), new Object({x: 270, y: 110}), color, ctx);
        this.drawCircle(new Object({x: 230, y: 350}), 15, color, ctx);
        this.drawBezierCurve(new Object({x: 270, y: 110}), new Object({x: 275, y: 101}), new Object({x: 295, y: 101}), new Object({x: 300, y: 110}), color, ctx);
        //k
        this.drawBezierCurve(new Object({x: 300, y: 110}), new Object({x: 550, y: 500}), new Object({x: 350, y: 600}), new Object({x: 350, y: 100}), color, ctx);
        this.drawBezierCurve(new Object({x: 350, y: 100}), new Object({x: 350, y: 400}), new Object({x: 550, y: 250}), new Object({x: 355, y: 175}), color, ctx);
        this.drawBezierCurve(new Object({x: 355, y: 175}), new Object({x: 450, y: 250}), new Object({x: 355, y: 20}), new Object({x: 500, y: 125}), color, ctx);
        //e
        this.drawBezierCurve(new Object({x: 500, y: 125}), new Object({x: 790, y: 335}), new Object({x: 500, y: 335}), new Object({x: 530, y: 170}), color, ctx);
        this.drawBezierCurve(new Object({x: 530, y: 170}), new Object({x: 545, y: 88}), new Object({x: 630, y: 88}), new Object({x: 700, y: 150}), color, ctx);
        //underline
        this.drawLine(new Object({x: 50, y: 75}), new Object({x:700, y: 75}), [0, 0, 0, 255], ctx);

    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        let right_bottom = new Object({x: right_top.x, y: left_bottom.y});
        let left_top = new Object({x: left_bottom.x, y: right_top.y});
        this.drawLine(left_bottom, right_bottom, color, ctx);
        this.drawLine(left_bottom, left_top, color, ctx);
        this.drawLine(left_top, right_top, color, ctx);
        this.drawLine(right_top, right_bottom, color, ctx);
        console.log(this.show_points);
        if(this.show_points) {
            this.drawPoint(left_bottom, [0, 0, 0, 255], ctx);
            this.drawPoint(right_bottom, [0, 0, 0, 255], ctx);
            this.drawPoint(left_top, [0, 0, 0, 255], ctx);
            this.drawPoint(right_top, [0, 0, 0, 255], ctx);
        }
        
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        // x = x(center) + radius * cos(angle);
        // y = y(center) + radius * cos(angle);
        for(let i=0; i<this.num_curve_sections; i++) {
                let point0 = new Object({x: center.x+radius*Math.cos((2*Math.PI*i)/this.num_curve_sections), y: center.y+radius*Math.sin((2*Math.PI*i)/this.num_curve_sections)});
                let point1 = new Object({x: center.x+radius*Math.cos((2*Math.PI*(i+1))/this.num_curve_sections), y: center.y+radius*Math.sin((2*Math.PI*(i+1))/this.num_curve_sections)});
                this.drawLine(point0, point1, color, ctx);
                if(this.show_points) {
                    this.drawPoint(point0, [0, 0, 0, 255], ctx);
                }
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        // x = (1-t)^3*P0x + 3*(1-t)^2*t*P1x + 3*(1-t)*t^2*P2x + t^3*P3x
        // y = (1-t)^3*P0y + 3*(1-t)^2*t*P1y + 3*(1-t)*t^2*P2y + t^3*P3x
        for(let i=0; i<this.num_curve_sections; i++) {
            let t= i/this.num_curve_sections;
            let t1= (i+1)/this.num_curve_sections;
            let x0 = (1-t)**3*pt0.x + 3*(1-t)**2*t*pt1.x + 3*(1-t)*t**2*pt2.x + t**3*pt3.x;
            let y0 = (1-t)**3*pt0.y + 3*(1-t)**2*t*pt1.y + 3*(1-t)*t**2*pt2.y + t**3*pt3.y;
            let x1 = (1-t1)**3*pt0.x + 3*(1-t1)**2*t1*pt1.x + 3*(1-t1)*t1**2*pt2.x + t1**3*pt3.x;
            let y1 = (1-t1)**3*pt0.y + 3*(1-t1)**2*t1*pt1.y + 3*(1-t1)*t1**2*pt2.y + t1**3*pt3.y;
            let point0 = new Object({x: x0, y: y0});
            let point1 = new Object({x: x1, y: y1});
            this.drawLine(point0, point1, color, ctx);
            if(this.show_points) {
                this.drawPoint(point0, [0, 0, 0, 255], ctx);
            }
        }
        if(this.show_points) {
            this.drawPoint(pt3, [0, 0, 0, 255], ctx);
            this.drawPoint(pt1, [255, 0, 0, 255], ctx);
            this.drawPoint(pt2, [255, 0, 0, 255], ctx);
        }
        
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }

    drawPoint(pt, color, ctx) {
        this.drawLine(new Object({x: pt.x-2, y: pt.y+2}), new Object({x: pt.x+2, y: pt.y-2}), color, ctx);
        this.drawLine(new Object({x: pt.x-2, y: pt.y-2}), new Object({x: pt.x+2, y: pt.y+2}), color, ctx);
    }
}
