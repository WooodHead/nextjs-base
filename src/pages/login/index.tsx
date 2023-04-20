import { Button, Form, Input, message } from "antd";
import styles from "./styles.module.scss";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Route } from "@/constants/route";
import { LoginCredentials } from "@/types/auth";
import { showMessage } from "@/utils";

export default function Login() {
  const router = useRouter();
  const { data: session, status: _ } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: LoginCredentials) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await signIn("credentials", {
          redirect: false,
          callbackUrl: window.location.origin,
          ...values,
        });

        if (response?.ok) {
          router.push(response.url as string);
          showMessage("Log in successfully", "success");
        } else {
          const error = JSON.parse(response?.error ?? "");
          throw error;
        }
      } catch (error: any) {
        if (error.error) showMessage(error.error.message, "error");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  useEffect(() => {
    if (session) router.push(Route.Home);
  }, [session]);

  return (
    <div className={styles.container}>
      <Form
        name="login-form"
        autoComplete="off"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name={"username"}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name={"password"}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
