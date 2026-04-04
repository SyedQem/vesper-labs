/** Matches --ease-out-expo */
export const easeOutExpo = [0.19, 1, 0.22, 1];

export function fadeUpTransition(reducedMotion) {
    return {
        duration: reducedMotion ? 0 : 0.85,
        ease: easeOutExpo,
    };
}
