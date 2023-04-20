import { Route } from "@/constants/route";
import {
  AppstoreOutlined,
  HomeOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import logoPTF from "../../../public/logo-ptf.png";
import styles from "./styles.module.scss";

const items: MenuProps["items"] = [
  {
    label: "Home",
    key: "Home",
    icon: <HomeOutlined />,
  },
  {
    label: "Reconciliation",
    key: "Reconciliation",
    icon: <AppstoreOutlined />,
  },
];

export default function Header() {
  const [current, setCurrent] = useState<string>("Home");
  const router = useRouter();

  const onMenuItemClick: MenuProps["onClick"] = (event) => {
    setCurrent(event.key);

    // get all Enum Route's keys are strings
    router.push(Route[event.key as keyof typeof Route]);
  };

  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <Image src={logoPTF} alt="logo-ptf" />
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
