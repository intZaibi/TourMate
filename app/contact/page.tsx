"use client"
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/layout/ContactForm';
import { Header } from '@/components/layout/Header';
import React from 'react';
import { useAuth } from '@/components/hooks/use-auth';

export default function ContactPage() {
  const { user } = useAuth();
  return (
    <>
      <Header user={user}/>
      <ContactForm/>
      <Footer/>
    </>
  );
}
