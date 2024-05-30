import axios from "axios";
import { useEffect, useState } from "react";

import { useAppDispatch, useTypedSelector } from "@/app/store";
import { reset, setUser } from "@/features/auth/authSlice";
import { User } from "@/features/auth/interfaces";

export const useAuth = () => {
  const [isPending, setIsPending] = useState(true);

  const session = useTypedSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get<User>("https://api-12dprsalajevs.kvalifikacija.rvt.lv/api/me", {
        headers: {
          Authorization: session.accessToken,
        },
      })
      .then((response) => {
        dispatch(setUser(response.data));
      })
      .catch(() => {
        dispatch(reset());
      })
      .finally(() => {
        setIsPending(false);
      });
  }, [dispatch, session.accessToken]);

  return { isPending, user: session.user };
};
