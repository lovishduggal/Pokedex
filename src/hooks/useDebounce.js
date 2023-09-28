function useDebounce(event, cb, delay = 3000) {
    let id;
    clearTimeout(id);
    id = setTimeout(() => {
        console.log(event.target.value);
        cb(event.target.value);
    }, delay);
}
export default useDebounce;
