'use client'
import Link from "next/link";
import Button from '@mui/material/Button'
import { Globe } from "lucide-react";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "next/navigation";

export function Header({user, logoutMutation}: any) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Globe className="text-primary text-xl" />
          <h1 className="text-xl font-bold text-gray-800">Tourmate</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="font-medium hover:text-primary transition">Home</Link>
          <Link href="/recommendations" className="font-medium hover:text-primary transition">Recommendations</Link>
          <Link href="/my-trips" className="font-medium hover:text-primary transition">My Trips</Link>
          {/* <Link href="/explore" className="font-medium hover:text-primary transition">Explore</Link> */}
          <Link href="/contact" className="font-medium hover:text-primary transition">Contact Us</Link>
        </nav>
        
        <div className="flex items-center gap-2">
          {!user? <>
          <Button onClick={()=>router.push('/auth')} variant="outlined" sx={{fontWeight: '500', textTransform: 'none', borderColor: 'hsl(20 5.9% 90%)', color: 'black', '&:hover': {backgroundColor: 'hsl(20 5.9% 97%)',}, display: { sm: 'none', xs: 'none', md: 'inline-block' }}}>Sign In</Button>

          <Button onClick={()=>router.push('/auth')} variant="contained" sx={{textTransform: 'none',}}>Get Started</Button>
          </>:
          <Button onClick={()=>logoutMutation.mutate()}>Logout</Button>
          }

          <IconButton aria-label="delete" sx={{display: {md: 'none'}}}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>
    </header>
  );
}