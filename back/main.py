import requests

def obter_token_do_arquivo(nome_arquivo):
    with open(nome_arquivo, 'r') as file:
        return file.read().strip()

def fazer_requisicao(endpoint, token):
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json',
    }

    resposta = requests.get(endpoint, headers=headers)

    if resposta.status_code == 200:
        return resposta.json()
    else:
        print(f'Erro na solicitação: {resposta.status_code}')
        return None

def main():
    # Substitua 'token.txt' pelo nome do arquivo onde o token está armazenado
    arquivo_token = 'token.txt'
    token = obter_token_do_arquivo(arquivo_token)

    if token:
        # Substitua 'https://painel-backoffice.totvs.app/provisioning/api/Company/CompanyInfo'
        # pelo URL do endpoint desejado
        endpoint_desejado = 'https://painel-backoffice.totvs.app/provisioning/api/Company/CompanyInfo'

        try:
            # Faça a solicitação usando o endpoint e o token
            resposta_api = fazer_requisicao(endpoint_desejado, token)

            if resposta_api:
                print('Resposta da API:', resposta_api)

        except Exception as e:
            print(f'Erro ao fazer a solicitação: {str(e)}')

if __name__ == '__main__':
    main()
