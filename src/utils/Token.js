export function getToken() {
    let token = localStorage.getItem('token')
    let currUser = localStorage.getItem('currentUser')
    if (!token) {
        token = sessionStorage.getItem('token')
        currUser = sessionStorage.getItem('currentUser')
    }
    return { token, currUser }
}