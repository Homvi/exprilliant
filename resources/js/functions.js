export const shuffleArray = (array) => {
    const newArray = [...array]; // Use spread syntax to copy the array
    newArray.forEach((_, i) => {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
    });
    return newArray;
};
