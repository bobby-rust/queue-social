"use client";

import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { default as NextImage } from "next/image";
import { flushSync } from "react-dom";

type Props = {};

export default function page({}: Props) {
    const [image, setImage] = useState<string | null>(null);

    const [boxWidth, setBoxWidth] = useState(200);
    const [boxHeight, setBoxHeight] = useState(200);
    let isResizing = useRef(false);
    let initialMouseLocation = useRef({ x: 0, y: 0 });
    let initialBoxSize = useRef({ width: 0, height: 0 });

    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (image && canvasRef!.current!.getContext("2d")) {
            const img = new Image();
            img.src = image;

            const scaleFactor = 5;
            img.onload = () => {
                console.log("img: ", img.naturalWidth, img.naturalHeight);
                console.log("unnatural img : ", img.width, img.height);
                const sx = (img.naturalWidth - img.naturalWidth) / 2; // Subtract the smaller side to create a square
                const sy = (img.naturalHeight - img.naturalWidth) / 2;
                const sWidth = img.naturalWidth;
                const sHeight = img.naturalWidth;
                const dWidth = 500; // make img 5x smaller;
                const dHeight = 500;
                canvasRef!.current!.width = dWidth + 50; // add 50px padding to check squareness
                canvasRef!.current!.height = dHeight + 50;
                const dx = 0;
                const dy = 0;
                canvasRef!
                    .current!.getContext("2d")!
                    .drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            };
        }
    }, [image]);

    function handleMouseDown(e: MouseEvent<HTMLDivElement>) {
        isResizing.current = true;
        initialMouseLocation.current = { x: e.pageX, y: e.pageY };
        initialBoxSize.current = { width: boxWidth, height: boxHeight };

        // console.log("Box width: ", boxWidth);
        // console.log("Box height: ", boxHeight);
        console.log("mouse down");
    }

    function handleMouseUp(e: any) {
        console.log("mouse up");
        // console.log("e: ", e);
        e.preventDefault();
        e.stopPropagation();
        isResizing.current = false;
    }

    useEffect(() => {
        // console.log("boxWidth: ", boxWidth);
        // console.log("boxHeight: ", boxHeight);
    }, [boxWidth, boxHeight]);

    function handleMouseMove(e: globalThis.MouseEvent): any {
        // console.log("mouse move");
        // console.log("Mosue move and resizing variable is: ", isResizing);
        if (isResizing.current) {
            // console.log("not resizing");

            // console.log("resizing");
            // console.log("mouse location : ", e.pageX, e.pageY);
            // console.log("initialMouseLocation: ", initialMouseLocation);
            // console.log("Box width: ", boxWidth);
            // console.log("box Height: ", boxHeight);
            const newHeight =
                initialMouseLocation.current.y < e.pageY
                    ? Math.abs(
                          e.pageY - initialMouseLocation.current.y + initialBoxSize.current.height,
                      )
                    : Math.abs(
                          e.pageY - initialMouseLocation.current.y - initialBoxSize.current.height,
                      );
            const newSize = {
                width: Math.abs(
                    e.pageX - initialMouseLocation.current.x + initialBoxSize.current.width,
                ),
                height: newHeight,
            };
            // console.log("New size: ", newSize);
            flushSync(() => {
                setBoxWidth(newSize.width);
                setBoxHeight(newSize.height);
            });
        }
    }

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    useEffect(() => {
        console.log("is Resizing changed: ", isResizing);
    }, [isResizing]);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <h1>Test</h1>
            {/* <input */}
            {/*     type="file" */}
            {/*     onChange={(e) => { */}
            {/*         setImage(URL.createObjectURL(e.target.files![e.target.files!.length - 1])); */}
            {/*     }} */}
            {/* /> */}
            {/* <canvas */}
            {/*     id="canvas" */}
            {/*     className="border-2 border-black" */}
            {/*     ref={canvasRef} */}
            {/*     width={1000} */}
            {/*     height={1000} */}
            {/* ></canvas> */}

            <div className="h-[500px] w-full relative flex justify-center items-center">
                <div className={`absolute bg-black`} style={{ height: boxHeight, width: boxWidth }}>
                    <div
                        className={`border-[3px] border-cyan-500 border-dashed`}
                        style={{ height: boxHeight, width: boxWidth }}
                    >
                        {/* Top left */}
                        <div
                            onMouseDown={(e) => handleMouseDown(e)}
                            className="absolute top-[-5px] left-[-5px] w-3 h-3 rounded-full border-2 border-cyan-500 cursor-nw-resize"
                        ></div>{" "}
                        {/* Bottom left */}
                        <div
                            onMouseDown={(e) => handleMouseDown(e)}
                            className="absolute bottom-[-5px] left-[-5px] w-3 h-3 rounded-full border-2 border-cyan-500 cursor-sw-resize"
                        ></div>{" "}
                        {/* Top right */}
                        <div
                            onMouseDown={(e) => handleMouseDown(e)}
                            className="absolute top-[-5px] right-[-5px] w-3 h-3 rounded-full border-2 border-cyan-500 cursor-ne-resize"
                        ></div>
                        {/* Bottom right */}
                        <div
                            onMouseDown={(e) => handleMouseDown(e)}
                            className="absolute w-3 h-3 bottom-[-5px] right-[-5px] rounded-full border-2 border-cyan-500 cursor-se-resize"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
