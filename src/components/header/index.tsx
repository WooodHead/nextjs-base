import { Route } from "@/constants/route";
import {
  BarChartOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu, MenuProps, Space } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { images } from "../../../public/images";
import styles from "./styles.module.scss";
import { useSession } from "next-auth/react";
import { API } from "@/types/api";
import { logout } from "@/services/auth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";

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
  const [current, setCurrent] = useState<keyof typeof Route>();

  const onMenuItemClick: MenuProps["onClick"] = (event) => {
    setCurrent(event.key as keyof typeof Route);

    // get all Enum Route's keys are strings
    router.push(Route[event.key as keyof typeof Route]);
  };

  const dropdownItems: MenuProps["items"] = useMemo(() => {
    return [
      {
        key: "logout",
        label: <span onClick={logout}>Log out</span>,
      },
    ];
  }, []);

  const goToHome = () => router.push(Route.Home);

  const displayName = useMemo(() => {
    if (!session) return "";
    return (session.user as API.LoginData).user.name;
  }, [session]);

  useEffect(() => {
    const keys = Object.keys(Route);
    keys.forEach((key) => {
      if (router.asPath === Route[key as keyof typeof Route]) {
        setCurrent(key as keyof typeof Route);
      }
    });
  }, []);

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
        selectedKeys={current ? [current] : undefined}
        items={items}
        mode="horizontal"
      />
    </div>
  );
}
