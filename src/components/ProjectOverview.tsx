
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Github, Play, Database, Cloud, Shield } from 'lucide-react';

const ProjectOverview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Sistema de Gestão de Pedidos
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            API RESTful robusta e escalável construída com Java, Spring Boot e AWS
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500">Java 17</Badge>
            <Badge variant="secondary" className="bg-green-600/20 text-green-300 border-green-500">Spring Boot</Badge>
            <Badge variant="secondary" className="bg-orange-600/20 text-orange-300 border-orange-500">AWS</Badge>
            <Badge variant="secondary" className="bg-red-600/20 text-red-300 border-red-500">Redis</Badge>
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500">MySQL</Badge>
          </div>
        </div>

        {/* Tech Stack Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-300">
                <Database className="h-5 w-5" />
                Backend Robusto
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              <ul className="space-y-2">
                <li>• Spring Boot + JPA</li>
                <li>• Swagger/OpenAPI</li>
                <li>• JUnit 5 Testing</li>
                <li>• Validação de dados</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-300">
                <Cloud className="h-5 w-5" />
                AWS Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              <ul className="space-y-2">
                <li>• RDS Aurora MySQL</li>
                <li>• S3 File Storage</li>
                <li>• OpenSearch</li>
                <li>• ECS Deploy</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-300">
                <Shield className="h-5 w-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              <ul className="space-y-2">
                <li>• Redis Cache</li>
                <li>• Latência < 50ms</li>
                <li>• Busca otimizada</li>
                <li>• Escalabilidade</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="structure" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
            <TabsTrigger value="structure">Estrutura</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="tests">Testes</TabsTrigger>
            <TabsTrigger value="deploy">Deploy</TabsTrigger>
          </TabsList>

          <TabsContent value="structure" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-blue-300">Estrutura do Projeto</CardTitle>
                <CardDescription className="text-slate-400">
                  Organização modular seguindo as melhores práticas do Spring Boot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-slate-300">
                  <pre>{`src/
├── main/
│   ├── java/com/pedidos/
│   │   ├── PedidosApplication.java
│   │   ├── config/
│   │   │   ├── RedisConfig.java
│   │   │   ├── SwaggerConfig.java
│   │   │   └── AwsConfig.java
│   │   ├── controller/
│   │   │   ├── PedidoController.java
│   │   │   └── FileController.java
│   │   ├── service/
│   │   │   ├── PedidoService.java
│   │   │   ├── CacheService.java
│   │   │   └── S3Service.java
│   │   ├── repository/
│   │   │   └── PedidoRepository.java
│   │   ├── model/
│   │   │   ├── Pedido.java
│   │   │   └── Cliente.java
│   │   └── dto/
│   │       ├── PedidoDTO.java
│   │       └── ClienteDTO.java
│   └── resources/
│       ├── application.yml
│       └── data.sql
├── test/
│   └── java/com/pedidos/
│       ├── controller/
│       └── service/
├── Dockerfile
├── docker-compose.yml
└── pom.xml`}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-green-300">Endpoints da API</CardTitle>
                <CardDescription className="text-slate-400">
                  RESTful API com documentação Swagger completa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-300 mb-2">Gestão de Pedidos</h4>
                    <div className="space-y-2 text-sm font-mono">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-600">GET</Badge>
                        <span className="text-slate-300">/api/pedidos</span>
                        <span className="text-slate-500">- Lista todos os pedidos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-600">GET</Badge>
                        <span className="text-slate-300">/api/pedidos/{id}</span>
                        <span className="text-slate-500">- Busca pedido por ID</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-600">POST</Badge>
                        <span className="text-slate-300">/api/pedidos</span>
                        <span className="text-slate-500">- Cria novo pedido</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-600">PUT</Badge>
                        <span className="text-slate-300">/api/pedidos/{id}</span>
                        <span className="text-slate-500">- Atualiza pedido</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-600">DELETE</Badge>
                        <span className="text-slate-300">/api/pedidos/{id}</span>
                        <span className="text-slate-500">- Remove pedido</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-300 mb-2">Busca e Filtros</h4>
                    <div className="space-y-2 text-sm font-mono">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-600">GET</Badge>
                        <span className="text-slate-300">/api/pedidos/search</span>
                        <span className="text-slate-500">- Busca com OpenSearch</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-600">GET</Badge>
                        <span className="text-slate-300">/api/pedidos/cliente/{nome}</span>
                        <span className="text-slate-500">- Busca por cliente</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-300 mb-2">Arquivos e Comprovantes</h4>
                    <div className="space-y-2 text-sm font-mono">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-600">POST</Badge>
                        <span className="text-slate-300">/api/files/upload</span>
                        <span className="text-slate-500">- Upload para S3</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-600">GET</Badge>
                        <span className="text-slate-300">/api/files/{id}</span>
                        <span className="text-slate-500">- Download de arquivo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-yellow-300">Modelo de Dados</CardTitle>
                <CardDescription className="text-slate-400">
                  Estrutura otimizada com AWS RDS Aurora MySQL
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-slate-300">
                  <pre>{`-- Tabela de Clientes
CREATE TABLE clientes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Pedidos
CREATE TABLE pedidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cliente_id BIGINT NOT NULL,
    numero_pedido VARCHAR(50) UNIQUE NOT NULL,
    status ENUM('PENDENTE', 'PROCESSANDO', 'ENVIADO', 'ENTREGUE', 'CANCELADO'),
    valor_total DECIMAL(10,2) NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_entrega TIMESTAMP NULL,
    comprovante_url VARCHAR(500),
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Tabela de Itens do Pedido
CREATE TABLE itens_pedido (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pedido_id BIGINT NOT NULL,
    produto VARCHAR(255) NOT NULL,
    quantidade INTEGER NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE
);

-- Índices para performance
CREATE INDEX idx_pedidos_cliente ON pedidos(cliente_id);
CREATE INDEX idx_pedidos_status ON pedidos(status);
CREATE INDEX idx_pedidos_data ON pedidos(data_pedido);
CREATE INDEX idx_clientes_email ON clientes(email);`}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-purple-300">Testes Automatizados</CardTitle>
                <CardDescription className="text-slate-400">
                  Cobertura completa com JUnit 5 e Mockito
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-300 mb-2">Tipos de Teste</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li>• <strong>Unit Tests:</strong> Testes de serviços e repositories</li>
                      <li>• <strong>Integration Tests:</strong> Testes de endpoints completos</li>
                      <li>• <strong>Cache Tests:</strong> Validação do Redis</li>
                      <li>• <strong>AWS Tests:</strong> Mocks para S3 e OpenSearch</li>
                    </ul>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-300 mb-2">Exemplo de Teste</h4>
                    <div className="bg-slate-950/50 p-3 rounded font-mono text-xs text-slate-300">
                      <pre>{`@Test
@DisplayName("Deve criar pedido com sucesso")
void deveCriarPedidoComSucesso() {
    // Given
    PedidoDTO pedidoDTO = criarPedidoDTO();
    when(clienteRepository.findById(1L))
        .thenReturn(Optional.of(cliente));
    
    // When
    PedidoDTO resultado = pedidoService.criarPedido(pedidoDTO);
    
    // Then
    assertThat(resultado).isNotNull();
    assertThat(resultado.getNumeroPedido()).isNotEmpty();
    verify(cacheService).invalidateCache("pedidos");
}`}</pre>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-300 mb-2">Métricas de Cobertura</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">95%</div>
                        <div className="text-slate-400">Line Coverage</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">88%</div>
                        <div className="text-slate-400">Branch Coverage</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deploy" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-orange-300">Deploy e Infraestrutura</CardTitle>
                <CardDescription className="text-slate-400">
                  Containerização com Docker e deploy no AWS ECS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-300 mb-2">Dockerfile</h4>
                    <div className="bg-slate-950/50 p-3 rounded font-mono text-xs text-slate-300">
                      <pre>{`FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY target/pedidos-api-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]`}</pre>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-300 mb-2">AWS ECS Task Definition</h4>
                    <div className="bg-slate-950/50 p-3 rounded font-mono text-xs text-slate-300">
                      <pre>{`{
  "family": "pedidos-api",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [{
    "name": "pedidos-api",
    "image": "your-ecr-repo/pedidos-api:latest",
    "portMappings": [{"containerPort": 8080}],
    "environment": [
      {"name": "SPRING_PROFILES_ACTIVE", "value": "prod"},
      {"name": "DB_HOST", "value": "aurora-cluster.amazonaws.com"}
    ]
  }]
}`}</pre>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-300 mb-2">Serviços AWS Utilizados</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-cyan-300">Compute & Storage</h5>
                        <ul className="text-sm text-slate-300 mt-2">
                          <li>• ECS Fargate</li>
                          <li>• ECR Repository</li>
                          <li>• S3 Buckets</li>
                          <li>• CloudWatch Logs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-cyan-300">Database & Cache</h5>
                        <ul className="text-sm text-slate-300 mt-2">
                          <li>• RDS Aurora MySQL</li>
                          <li>• ElastiCache Redis</li>
                          <li>• OpenSearch Service</li>
                          <li>• Parameter Store</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mt-12">
          <Card className="bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-700">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400">< 50ms</div>
              <div className="text-green-300">Tempo de Resposta</div>
              <div className="text-xs text-slate-400 mt-1">Com Redis Cache</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-700">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400">99.9%</div>
              <div className="text-blue-300">Uptime</div>
              <div className="text-xs text-slate-400 mt-1">AWS ECS Fargate</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-700">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400">10k+</div>
              <div className="text-purple-300">Req/min</div>
              <div className="text-xs text-slate-400 mt-1">Capacidade</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 border-orange-700">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-400">95%</div>
              <div className="text-orange-300">Test Coverage</div>
              <div className="text-xs text-slate-400 mt-1">JUnit 5</div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Github className="h-4 w-4 mr-2" />
            Ver no GitHub
          </Button>
          <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-600/10">
            <Play className="h-4 w-4 mr-2" />
            Demo Live
          </Button>
          <Button variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/10">
            <Download className="h-4 w-4 mr-2" />
            Swagger Docs
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-slate-400">
          <p>Sistema desenvolvido seguindo as melhores práticas de desenvolvimento backend com Java e AWS</p>
          <p className="mt-2">Pronto para ambientes produtivos e alta escala</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
