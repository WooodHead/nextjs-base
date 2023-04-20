import { Route } from "@/constants/route";
import {
  BarChartOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu, MenuProps, Space } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { images } from "../../../public/images";
import styles from "./styles.module.scss";
import { SignOutParams, signOut, useSession } from "next-auth/react";
import { API } from "@/types/api";

const items: MenuProps["items"] = [
  {
    label: "Home",
    key: "Home",
    icon: <HomeOutlined />,
  },
  {
    label: "Reconciliation",
    key: "Reconciliation",
    icon: <BarChartOutlined />,
  },
];

export default function Header() {
  const router = useRouter();
  const { data: session, status: _ } = useSession();
  const [current, setCurrent] = useState<keyof typeof Route>("Home");

  const signOutHandler = async () => {
    try {
      const options: SignOutParams = {
        callbackUrl: `${window.location.origin}${Route.Login}`,
      };
      const _ = await signOut<true>(options);
    } catch (error: any) {
      console.log("sign out error: ", error);
    }
  };

  const onMenuItemClick: MenuProps["onClick"] = (event) => {
    setCurrent(event.key as keyof typeof Route);

    // get all Enum Route's keys are strings
    router.push(Route[event.key as keyof typeof Route]);
  };

  const dropdownItems: MenuProps["items"] = useMemo(() => {
    return [
      {
        key: "logout",
        label: <span onClick={signOutHandler}>Log out</span>,
      },
    ];
  }, []);

  const goToHome = () => {
    router.push(Route.Home);
  };

  const displayName = useMemo(() => {
    if (!session) return "";
    return (session.user as API.LoginData).user.name;
  }, [session]);

  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <Image
          src={images.logoPTF}
          alt="logo-ptf"
          onClick={goToHome}
          className={styles.logo}
        />
        <Space direction="horizontal" wrap>
          <Dropdown placement="bottom" menu={{ items: dropdownItems }}>
            <Space>
              <p>{displayName}</p>
              <Avatar size={32} icon={<UserOutlined />} />
            </Space>
          </Dropdown>
        </Space>
      </div>

      <Menu
        className={styles.menu}
        onClick={onMenuItemClick}
        selectedKeys={[current]}
        items={items}
        mode="horizontal"
      />
    </div>
  );
}
