import React, {useContext, useState,useEffect} from "react";


const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();
const MenuContext = React.createContext();
const MenuUpdateContext = React.createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
}

export function useMenuToggle() {
    return useContext(MenuContext)
}

export function useMenuUpdateToggle() {
    return useContext(MenuUpdateContext)
}

export function ThemeProvider({children}) {



    const [darkTheme, setDarkTheme] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(true);

    useEffect(() => {
        (async() => {
            const f = await localStorage.getItem("darkTheme")


            if (f === "false")
            setDarkTheme(true)
        })();
    })
        




    function toggleTheme() {
        setDarkTheme(prevTheme => !prevTheme);
        (async()=>{
            localStorage.setItem("darkTheme", `${darkTheme ? "true" : "false"}`)
            const a = await localStorage.getItem("darkTheme");
            console.log("theme changed in local storage", a)

        })()


       
    }

    function toggleMenuHandler() {
        setToggleMenu(toggleMenu => !toggleMenu);
        console.log("toggle menu value changed...", toggleMenu)
    }

    return(
        <ThemeContext.Provider value = {darkTheme}>
            <ThemeUpdateContext.Provider value = {toggleTheme}>
                <MenuContext.Provider value = {toggleMenu}>
                    <MenuUpdateContext.Provider value = {toggleMenuHandler} >
                        {children}
                    </MenuUpdateContext.Provider>
                </MenuContext.Provider>
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}