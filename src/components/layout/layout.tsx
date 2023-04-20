import { SessionStatus } from "@/constants/auth";
import { Route } from "@/constants/route";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import Header from "../header/header";
import styles from "./styles.module.scss";

interface IProps {
  children: any;
}

export default function Layout({ children }: IProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const showHeader = useMemo(() => {
    const RoutesWithoutHeader = ["/login"];
    const currentPath = router.asPath;

    if (RoutesWithoutHeader.includes(currentPath)) return false;
    return true;
  }, [router.asPath]);

  useEffect(() => {
    const inLoginPage = router.asPath === Route.Login;
    if (!inLoginPage && !session && status !== SessionStatus.Loading) {
      router.push(Route.Login);
    }
  }, [session]);

  return (
    <div className={styles.container}>
      {showHeader && <Header />}
      {children}
    </div>
  );
}
