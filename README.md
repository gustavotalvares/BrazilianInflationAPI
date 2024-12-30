# [EN] Brazilian Inflation API
# [PT-BR] API de Inflação Brasileira

## Important Notice | Aviso Importante

**[EN]**
This project, including this README file, was entirely developed by artificial intelligence using Cursor IDE and Claude 3.5 Sonnet.

⚠️ **DISCLAIMER**: The data provided by this API should not be used for investment decisions or economic analyses. This is a test project and may contain errors. For official inflation data, please refer to IBGE (for IPCA) and FGV (for IGP-M).

**[PT-BR]**
Este projeto, incluindo este arquivo README, foi desenvolvido inteiramente por inteligência artificial utilizando o Cursor IDE e Claude 3.5 Sonnet.

⚠️ **AVISO**: Os dados fornecidos por esta API não devem ser utilizados para decisões de investimento ou análises econômicas. Este é um projeto de teste e pode conter erros. Para dados oficiais de inflação, consulte o IBGE (para o IPCA) e a FGV (para o IGP-M).

---

## About | Sobre

**[EN]**
A RESTful API that provides access to Brazilian inflation indices (IPCA and IGP-M) from August 1994 onwards. The API offers various endpoints for retrieving and analyzing inflation data, including specific period queries, variations between dates, and accumulated yearly rates.

**[PT-BR]**
Uma API RESTful que fornece acesso aos índices de inflação brasileiros (IPCA e IGP-M) a partir de agosto de 1994. A API oferece diversos endpoints para consulta e análise dos dados de inflação, incluindo consultas por período específico, variações entre datas e taxas acumuladas anuais.

## Features | Funcionalidades

**[EN]**
- Get inflation indices for specific periods
- Calculate variations between dates
- Get accumulated yearly inflation
- Access latest available data
- Calculate monthly variations
- Get average inflation rates
- Find extreme values (highest/lowest) for a given year

**[PT-BR]**
- Obter índices de inflação para períodos específicos
- Calcular variações entre datas
- Obter inflação acumulada anual
- Acessar dados mais recentes
- Calcular variações mensais
- Obter taxas médias de inflação
- Encontrar valores extremos (máximo/mínimo) para um determinado ano

## Technologies | Tecnologias

### Core Technologies
- Node.js
- Express.js
- JavaScript

### Frontend
- HTML5
- CSS3
- Prism.js (syntax highlighting)


## Installation | Instalação

**[EN]**
1. Clone the repository:
```bash
git clone https://github.com/gustavotalvares/BrazilianInflationAPI.git
```

2. Install dependencies:
```bash
cd BrazilianInflationAPI
npm install
```

3. Start the server:
```bash
node server.js
```

The API will be available at `http://localhost:3000`

**[PT-BR]**
1. Clone o repositório:
```bash
git clone https://github.com/gustavotalvares/BrazilianInflationAPI.git
```

2. Instale as dependências:
```bash
cd BrazilianInflationAPI
npm install
```

3. Inicie o servidor:
```bash
node server.js
```

A API estará disponível em `http://localhost:3000`

## API Documentation | Documentação da API

**[EN]**
Access the complete documentation by visiting `/docs` endpoint after starting the server:
```
http://localhost:3000/docs
```

### Available Endpoints

1. `GET /api/indices/:year/:month?`
   - Get indices for specific year/month

2. `GET /api/range`
   - Get indices between two dates
   - Query params: startYear, startMonth, endYear, endMonth

3. `GET /api/variation`
   - Calculate variation between two periods
   - Query params: startYear, startMonth, endYear, endMonth

4. `GET /api/accumulated/:year`
   - Get accumulated inflation for a year

5. `GET /api/latest`
   - Get latest available indices

6. `GET /api/monthly-variation/:year/:month`
   - Get month-over-month variation

7. `GET /api/average`
   - Get average inflation for a period
   - Query params: startYear, startMonth, endYear, endMonth

8. `GET /api/extremes/:year`
   - Get highest and lowest inflation months for a year

**[PT-BR]**
Acesse a documentação completa visitando o endpoint `/docs` após iniciar o servidor:
```
http://localhost:3000/docs
```

### Endpoints Disponíveis

1. `GET /api/indices/:year/:month?`
   - Obtém índices para ano/mês específico

2. `GET /api/range`
   - Obtém índices entre duas datas
   - Parâmetros: startYear, startMonth, endYear, endMonth

3. `GET /api/variation`
   - Calcula variação entre dois períodos
   - Parâmetros: startYear, startMonth, endYear, endMonth

4. `GET /api/accumulated/:year`
   - Obtém inflação acumulada do ano

5. `GET /api/latest`
   - Obtém índices mais recentes

6. `GET /api/monthly-variation/:year/:month`
   - Obtém variação mês a mês

7. `GET /api/average`
   - Obtém média de inflação para um período
   - Parâmetros: startYear, startMonth, endYear, endMonth

8. `GET /api/extremes/:year`
   - Obtém meses com maior e menor inflação do ano

## Error Handling | Tratamento de Erros

**[EN]**
The API uses standard HTTP status codes and returns errors in the following format:
```json
{
    "error": "Error message description"
}
```

**[PT-BR]**
A API utiliza códigos de status HTTP padrão e retorna erros no seguinte formato:
```json
{
    "error": "Descrição da mensagem de erro"
}
```

## Contributing | Contribuindo

**[EN]**
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**[PT-BR]**
1. Faça um fork do repositório
2. Crie sua branch de feature (`git checkout -b feature/RecursoIncrivel`)
3. Commit suas alterações (`git commit -m 'Adiciona algum RecursoIncrivel'`)
4. Push para a branch (`git push origin feature/RecursoIncrivel`)
5. Abra um Pull Request

## License | Licença

**[EN]**
This project is licensed under the MIT License - see the LICENSE file for details.

**[PT-BR]**
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.
