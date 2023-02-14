import clsx from "clsx"
import styles from "./Button.module.scss"
function Button({ primary, onClick, children, error, warning}) {
    console.log(primary);
    const classes = clsx(styles.btn,'mt-16', {
        [styles.primary] : primary,
        [styles.error] : error,
        [styles.warning] : warning, 
    })
    return (
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    )
}
export default Button