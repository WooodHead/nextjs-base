import { SessionStatus } from "@/constants/auth";
import { Route } from "@/constants/route";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import Header from "../header";
import styles from "./styles.module.scss";
import { API } from "@/types/api";
import Footer from "../footer";
import { useQuery } from "@tanstack/react-query";
import { getRoleById } from "@/services/role";
import { useDispatch } from "react-redux";
import { updateRole } from "@/redux/role-slice";
import { RootState } from "@/redux";
import { logout } from "@/services/auth";
interface IProps {
  children: any;
}

export default function Layout({ children }: IProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const roleId = useMemo(() => {
    if (!session) return null;
    const id = (session.user as API.LoginData).user.roleId;
    return id;
  }, [session]);

  const _ = useQuery(["role", roleId], () => getRoleById(roleId as string), {
    enabled: !!roleId,
    onSuccess: (data) => {
      dispatch(updateRole(data.data));
    },
    onError: (_error: any) => {
      dispatch(updateRole(null));
      logout();
    },
  });

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

    // login
    if (session) {
      const { access, refresh } = (session.user as API.LoginData).tokens;
      localStorage.setItem("accessToken", access.token);
      localStorage.setItem("refreshToken", refresh.token);
    }
  }, [session, status]);

  return (
    <div className={styles.container}>
      <>
        {showHeader && <Header />}
        {children}
        <Footer />
      </>
    </div>
  );
}
