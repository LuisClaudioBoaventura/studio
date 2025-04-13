'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useRouter} from 'next/navigation';
import {useToast} from '@/hooks/use-toast';

interface LoginProps {
  onLogin?: () => void;
}

export const Login: React.FC<LoginProps> = ({onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const {toast} = useToast();

  const handleLogin = async () => {
    if (username === 'user' && password === 'password') {
      localStorage.setItem('token', 'dummytoken');
      toast({
        title: 'Login efetuado com sucesso!',
        description: 'Você será redirecionado para a página inicial.',
      });
      onLogin && onLogin();
      router.push('/');
    } else {
      setError('Credenciais inválidas');
      toast({
        title: 'Erro!',
        description: 'Usuário ou senha incorretos.',
        variant: 'destructive',
      });
      setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background transition-opacity duration-300 animate-fade-in">
      <Card className="w-full max-w-md transition-all duration-300 hover:shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">Entre com seu usuário e senha para continuar</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && (
            <p className="text-red-500 text-sm animate-slide-in-left">
              {error}
            </p>
          )}
          <div className="grid gap-2">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleLogin}>Entrar</Button>
        </CardContent>
      </Card>
    </div>
  );
};
