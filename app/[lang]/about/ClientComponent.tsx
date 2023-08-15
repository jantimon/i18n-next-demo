"use client";

import { useTranslate } from "next-i18n/context";

export const ClientComponent = () => {
  const { __ } = useTranslate();
  return __("client component");
};
