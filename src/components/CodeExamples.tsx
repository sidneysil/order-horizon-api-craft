
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check } from 'lucide-react';

const CodeExamples = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const javaCode = `@RestController
@RequestMapping("/api/pedidos")
@Api(tags = "Gestão de Pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    @ApiOperation("Lista todos os pedidos com cache")
    @Cacheable(value = "pedidos", key = "'all'")
    public ResponseEntity<List<PedidoDTO>> listarPedidos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        List<PedidoDTO> pedidos = pedidoService.listarPedidos(pageable);
        return ResponseEntity.ok(pedidos);
    }

    @PostMapping
    @ApiOperation("Cria um novo pedido")
    public ResponseEntity<PedidoDTO> criarPedido(@Valid @RequestBody PedidoDTO pedidoDTO) {
        PedidoDTO novoPedido = pedidoService.criarPedido(pedidoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoPedido);
    }

    @GetMapping("/{id}")
    @ApiOperation("Busca pedido por ID")
    @Cacheable(value = "pedido", key = "#id")
    public ResponseEntity<PedidoDTO> buscarPedido(@PathVariable Long id) {
        PedidoDTO pedido = pedidoService.buscarPorId(id);
        return ResponseEntity.ok(pedido);
    }

    @GetMapping("/search")
    @ApiOperation("Busca pedidos usando OpenSearch")
    public ResponseEntity<List<PedidoDTO>> buscarPedidos(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        List<PedidoDTO> resultados = pedidoService.buscarComOpenSearch(query, page, size);
        return ResponseEntity.ok(resultados);
    }
}`;

  const serviceCode = `@Service
@Transactional
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private CacheService cacheService;
    
    @Autowired
    private OpenSearchService openSearchService;

    public PedidoDTO criarPedido(PedidoDTO pedidoDTO) {
        // Validar cliente
        Cliente cliente = clienteRepository.findById(pedidoDTO.getClienteId())
            .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));

        // Converter DTO para entidade
        Pedido pedido = new Pedido();
        pedido.setCliente(cliente);
        pedido.setNumeroPedido(gerarNumeroPedido());
        pedido.setStatus(StatusPedido.PENDENTE);
        pedido.setValorTotal(pedidoDTO.getValorTotal());
        pedido.setObservacoes(pedidoDTO.getObservacoes());

        // Salvar no banco
        Pedido pedidoSalvo = pedidoRepository.save(pedido);

        // Indexar no OpenSearch para busca
        openSearchService.indexarPedido(pedidoSalvo);

        // Invalidar cache
        cacheService.invalidateCache("pedidos");

        return convertToDTO(pedidoSalvo);
    }

    @Cacheable(value = "pedido", key = "#id")
    public PedidoDTO buscarPorId(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Pedido não encontrado"));
        return convertToDTO(pedido);
    }

    public List<PedidoDTO> buscarComOpenSearch(String query, int page, int size) {
        return openSearchService.buscarPedidos(query, page, size);
    }

    private String gerarNumeroPedido() {
        return "PED" + System.currentTimeMillis();
    }

    private PedidoDTO convertToDTO(Pedido pedido) {
        return PedidoDTO.builder()
            .id(pedido.getId())
            .numeroPedido(pedido.getNumeroPedido())
            .clienteId(pedido.getCliente().getId())
            .clienteNome(pedido.getCliente().getNome())
            .status(pedido.getStatus())
            .valorTotal(pedido.getValorTotal())
            .dataPedido(pedido.getDataPedido())
            .observacoes(pedido.getObservacoes())
            .build();
    }
}`;

  const configCode = `@Configuration
@EnableCaching
@EnableSwagger2
public class ApplicationConfig {

    @Bean
    @Primary
    public LettuceConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration();
        config.setHostName(environment.getProperty("spring.redis.host"));
        config.setPort(Integer.parseInt(environment.getProperty("spring.redis.port")));
        return new LettuceConnectionFactory(config);
    }

    @Bean
    public CacheManager cacheManager() {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(10))
            .serializeKeysWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new StringRedisSerializer()))
            .serializeValuesWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new GenericJackson2JsonRedisSerializer()));

        return RedisCacheManager.builder(redisConnectionFactory())
            .cacheDefaults(config)
            .build();
    }

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.pedidos.controller"))
            .paths(PathSelectors.any())
            .build()
            .apiInfo(apiInfo())
            .securitySchemes(Arrays.asList(apiKey()))
            .securityContexts(Arrays.asList(securityContext()));
    }

    @Bean
    public AmazonS3 amazonS3Client() {
        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(
            environment.getProperty("aws.access.key"),
            environment.getProperty("aws.secret.key")
        );
        return AmazonS3ClientBuilder.standard()
            .withRegion(environment.getProperty("aws.region"))
            .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
            .build();
    }
}`;

  const testCode = `@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class PedidoServiceTest {

    @Autowired
    private PedidoService pedidoService;

    @MockBean
    private PedidoRepository pedidoRepository;

    @MockBean
    private ClienteRepository clienteRepository;

    @MockBean
    private CacheService cacheService;

    @MockBean
    private OpenSearchService openSearchService;

    private Cliente cliente;
    private Pedido pedido;

    @BeforeEach
    void setUp() {
        cliente = Cliente.builder()
            .id(1L)
            .nome("João Silva")
            .email("joao@email.com")
            .build();

        pedido = Pedido.builder()
            .id(1L)
            .numeroPedido("PED123456")
            .cliente(cliente)
            .status(StatusPedido.PENDENTE)
            .valorTotal(BigDecimal.valueOf(100.00))
            .build();
    }

    @Test
    @DisplayName("Deve criar pedido com sucesso")
    void deveCriarPedidoComSucesso() {
        // Given
        PedidoDTO pedidoDTO = PedidoDTO.builder()
            .clienteId(1L)
            .valorTotal(BigDecimal.valueOf(100.00))
            .observacoes("Pedido teste")
            .build();

        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));
        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedido);

        // When
        PedidoDTO resultado = pedidoService.criarPedido(pedidoDTO);

        // Then
        assertThat(resultado).isNotNull();
        assertThat(resultado.getClienteId()).isEqualTo(1L);
        assertThat(resultado.getValorTotal()).isEqualTo(BigDecimal.valueOf(100.00));
        
        verify(openSearchService).indexarPedido(any(Pedido.class));
        verify(cacheService).invalidateCache("pedidos");
    }

    @Test
    @DisplayName("Deve lançar exceção quando cliente não existe")
    void deveLancarExcecaoQuandoClienteNaoExiste() {
        // Given
        PedidoDTO pedidoDTO = PedidoDTO.builder()
            .clienteId(999L)
            .valorTotal(BigDecimal.valueOf(100.00))
            .build();

        when(clienteRepository.findById(999L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(EntityNotFoundException.class, 
            () -> pedidoService.criarPedido(pedidoDTO));
    }

    @Test
    @DisplayName("Deve buscar pedido por ID com cache")
    void deveBuscarPedidoPorIdComCache() {
        // Given
        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));

        // When
        PedidoDTO resultado = pedidoService.buscarPorId(1L);

        // Then
        assertThat(resultado).isNotNull();
        assertThat(resultado.getId()).isEqualTo(1L);
        assertThat(resultado.getNumeroPedido()).isEqualTo("PED123456");
    }
}`;

  const dockerCode = `# Multi-stage build para otimizar o tamanho da imagem
FROM maven:3.8.4-openjdk-17-slim AS builder

WORKDIR /app
COPY pom.xml .
COPY src ./src

# Build da aplicação
RUN mvn clean package -DskipTests

# Imagem final
FROM openjdk:17-jdk-slim

# Adicionar usuário não-root para segurança
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \\
    curl \\
    && rm -rf /var/lib/apt/lists/*

# Criar diretório da aplicação
WORKDIR /app

# Copiar JAR da etapa de build
COPY --from=builder /app/target/pedidos-api-*.jar app.jar

# Mudar proprietário dos arquivos
RUN chown -R appuser:appuser /app

# Usar usuário não-root
USER appuser

# Configurar JVM para container
ENV JAVA_OPTS="-Xmx512m -Xms256m -XX:+UseG1GC -XX:+UseContainerSupport"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \\
    CMD curl -f http://localhost:8080/actuator/health || exit 1

# Expor porta
EXPOSE 8080

# Comando de inicialização
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]`;

  const CodeBlock = ({ code, language, id }: { code: string; language: string; id: string }) => (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-slate-400">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(code, id)}
          className="text-slate-400 hover:text-white"
        >
          {copiedCode === id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <div className="bg-slate-950/50 p-4 rounded-lg font-mono text-xs text-slate-300 overflow-x-auto">
        <pre>{code}</pre>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Exemplos de Código
        </h2>
        <p className="text-slate-400">Implementação completa com as melhores práticas</p>
      </div>

      <Tabs defaultValue="controller" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
          <TabsTrigger value="controller">Controller</TabsTrigger>
          <TabsTrigger value="service">Service</TabsTrigger>
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="tests">Tests</TabsTrigger>
          <TabsTrigger value="docker">Docker</TabsTrigger>
        </TabsList>

        <TabsContent value="controller" className="mt-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-blue-300">PedidoController.java</CardTitle>
              <CardDescription className="text-slate-400">
                REST Controller com Swagger e Cache Redis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={javaCode} language="Java" id="controller" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="service" className="mt-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-green-300">PedidoService.java</CardTitle>
              <CardDescription className="text-slate-400">
                Lógica de negócio com integração OpenSearch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={serviceCode} language="Java" id="service" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="mt-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-purple-300">ApplicationConfig.java</CardTitle>
              <CardDescription className="text-slate-400">
                Configuração Redis, Swagger e AWS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={configCode} language="Java" id="config" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tests" className="mt-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-yellow-300">PedidoServiceTest.java</CardTitle>
              <CardDescription className="text-slate-400">
                Testes unitários com JUnit 5 e Mockito
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={testCode} language="Java" id="tests" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docker" className="mt-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-orange-300">Dockerfile</CardTitle>
              <CardDescription className="text-slate-400">
                Multi-stage build otimizado para produção
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={dockerCode} language="Dockerfile" id="docker" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodeExamples;
