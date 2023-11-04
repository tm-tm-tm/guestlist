import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import styles from './Login.module.css'

import UserOutlineSVG from "@/assets/svg/UserOutlineSVG"
import ClipboardSVG from "@/assets/svg/ClipboardSVG"
import LoginArrowSVG from "@/assets/svg/LoginArrowSVG"
import LogoutArrowSVG from "@/assets/svg/LogoutArrowSVG";

export default function Login() {
    const { data: session } = useSession()

    return (
        <>
            {
                session ?
                    <div className={styles.loginContainer}>

                        <div className={styles.username}>
                            {session.user.email}
                        </div>

                        {
                            session && session.user.role === 'Admin' && (
                                <button className={styles.button} data-tooltip={'Admin'}>
                                    <Link href="/admin">
                                        <span className={styles.icon}>
                                            <ClipboardSVG />
                                        </span>
                                    </Link>
                                </button>
                            )
                        }

                        <button
                            className={styles.button}
                            data-tooltip={'Account'}
                        >
                            <Link href="/auth/account">
                                <span className={styles.icon}>
                                    <UserOutlineSVG />
                                </span>
                            </Link>
                        </button>

                        <button
                            className={styles.button}
                            data-tooltip={'Logout'}
                            onClick={() => signOut({ callbackUrl: '/' })}
                        >
                            <span className={styles.icon}>
                                <LogoutArrowSVG />
                            </span>
                        </button>

                    </div>
                    :
                    <div className={styles.loginContainer}>
                        {/* NOT LOGGED IN */}
                        <button
                            className={styles.button}
                            data-tooltip={'Login'}
                        >
                            <Link href="/auth/signin">
                                <span className={styles.icon}>
                                    <LoginArrowSVG />
                                </span>
                            </Link>
                        </button>

                    </div>
            }
        </>
    )
}





// export default function Login() {
//   const { data: session } = useSession();

//   return (
//     <div className={styles.loginContainer}>
//       {session ? (
//         <LoggedInContent session={session} />
//       ) : (
//         <NotLoggedInContent />
//       )}
//     </div>
//   );
// }

// function LoggedInContent({ session }) {
//   return (
//     <>
//       {session.user.role === "Admin" && (
//         <ButtonWithLink tooltip="Admin" href="/protected">
//           <ClipboardSVG />
//         </ButtonWithLink>
//       )}

//       <div className={styles.username}>{session.user.email}</div>

//       <ButtonWithLink tooltip="Account" href="/auth/account">
//         <UserOutlineSVG />
//       </ButtonWithLink>

//       <button
//         className={styles.button}
//         data-tooltip="Logout"
//         onClick={() => signOut({ callbackUrl: "/" })}
//       >
//         <span className={styles.icon}>
//           <LogoutArrowSVG />
//         </span>
//       </button>
//     </>
//   );
// }

// function NotLoggedInContent() {
//   return (
//     <ButtonWithLink tooltip="Login" href="/auth/signin">
//       <LoginArrowSVG />
//     </ButtonWithLink>
//   );
// }

// function ButtonWithLink({ tooltip, href, children }) {
//   return (
//     <button className={styles.button} data-tooltip={tooltip}>
//       <Link href={href}>
//         <span className={styles.icon}>{children}</span>
//       </Link>
//     </button>
//   );
// }
