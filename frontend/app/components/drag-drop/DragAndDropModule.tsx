"use client";

import React, { useRef } from "react";
import { useDrop } from "react-dnd";

/**
 * Interface representing a draggable item.
 * @template T - The type of the container.
 */
interface DraggableItem<T = any> {
    id: string; // Unique identifier for the item
    currentContainer: T; // Current container of the item
    // Additional properties can be added as needed
}

/**
 * Props for the DragAndDropModule component.
 * @template T - The type of the container.
 * @template ItemType - The type of the draggable item.
 */
interface DragAndDropModuleProps<T = any, ItemType = DraggableItem<T>> {
    children: React.ReactNode; // Children components to render inside the container
    moveTask: (id: string, currentContainer: T, newContainer: T) => void; // Function to move the task
    containerName: T; // Name of the container
    accept: string | string[] | ((props: any) => string | string[]); // Acceptable item type(s) for drag-and-drop
    onDrop?: (item: ItemType) => void; // Optional custom drop handler
    onDragEnter?: () => void; // Optional callback for drag enter
    onDragLeave?: () => void; // Optional callback for drag leave
    onDragEnd?: () => void; // Optional callback for drag end
    className?: string; // Custom class name for the drop area
}

/**
 * DragAndDropModule component provides a drag-and-drop interface.
 *
 * This component allows users to drag items into a designated area and handle the drop event.
 * It supports customizable behavior through various props.
 *
 * @template T - The type of the container.
 * @template ItemType - The type of the draggable item.
 * @param {DragAndDropModuleProps<T, ItemType>} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const DragAndDropModule = <T, ItemType extends DraggableItem<T>>({
    children,
    moveTask,
    containerName,
    accept,
    onDrop,
    onDragEnter,
    onDragLeave,
    onDragEnd,
    className = "", // Default to an empty string if no class is provided
}: DragAndDropModuleProps<T, ItemType>) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: typeof accept === "function" ? accept({}) : accept,
        drop: (item: ItemType) => {
            moveTask(item.id, item.currentContainer, containerName);
            if (onDrop) {
                onDrop(item); // Call the custom drop handler if provided
            }
        },
        hover: () => {
            if (onDragEnter) onDragEnter(); // Call onDragEnter if provided
        },
        leave: () => {
            if (onDragLeave) onDragLeave(); // Call onDragLeave if provided
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    const ref = useRef<HTMLDivElement>(null);
    drop(ref);

    return (
        <div
            ref={ref}
            className={`bg-[#E9E7E5] rounded-[20px] ${isOver && canDrop ? "bg-green-200" : ""
                } ${className} py-6`}
        >
            {children}
        </div>
    );
};

export default DragAndDropModule;