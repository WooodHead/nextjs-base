import { Button, Form, Input, message } from "antd";
import styles from "./styles.module.scss";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Route } from "@/constants/route";
import { LoginCredentials } from "@/types/auth";
import { showMessage } from "@/utils";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

interface IProps {
  loggedIn: boolean;
}

export default function Login({ loggedIn }: IProps) {
  const router = useRouter();
  const { data: _session, status: _ } = useSession();
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

        // tokens logic in layout
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
    // Navigate back to home page if the user has logged in
    // but intentionally navigates to login page
    if (loggedIn) router.push(Route.Home);
  }, [loggedIn]);

  return (
    <div className={styles.container}>
      <Head>
        <title>PTF - Log in</title>
      </Head>

      {!loggedIn && (
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
      )}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let session: Session | null = null;

  try {
    session = await getServerSession(context.req, context.res, authOptions);
  } catch (error: any) {
    // Do something with the error
  }

  return {
    props: {
      loggedIn: session ? true : false,
    },
  };
}
