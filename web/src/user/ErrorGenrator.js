import React from "react";

export function errorGenerator() {
    const errors = ['OOPS!', 'OH NO!', "let's give it another try", "you've failed", "you're not very good at this",
        "Looks like you messed up", "Think you can trick us?", "To err is human"];
    return errors[Math.floor(Math.random() * errors.length)];
}   