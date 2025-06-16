-- public.contatos definição

-- Drop table

-- DROP TABLE public.contatos;

CREATE TABLE public.contatos (
	id serial4 NOT NULL,
	nome text NOT NULL,
	telefone text NOT NULL,
	email text NOT NULL,
	endereco text NULL,
	CONSTRAINT contatos_pkey PRIMARY KEY (id)
);