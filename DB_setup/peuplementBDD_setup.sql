USE groupomania;
SET NAMES utf8;

INSERT INTO users (firstname, lastname, email, password, birthdate, gender, imageUrl, deleted, moderator) VALUES 
('Barack', 'Opamal', 'barackopamal@gmail.com', '$2b$10$UlygLu5Qmox07RGf4Yjqe.GAJ.SPHwB0fkiuRgvu3CJhV8bEOgSCm', '1961-08-04', 'H', "http://localhost:5000/images/barack_opamal1623313402773.jpg", 0, 1),
('Michel', 'Palaref', 'michelpalaref@gmail.com', '$2b$10$UlygLu5Qmox07RGf4Yjqe.GAJ.SPHwB0fkiuRgvu3CJhV8bEOgSCm', '1944-07-03', 'H', "http://localhost:5000/images/michel_palaref1623314721119.jpg", 0, 0),
('Johnny', 'Validay', 'johnnyvaliday@gmail.com', '$2b$10$UlygLu5Qmox07RGf4Yjqe.GAJ.SPHwB0fkiuRgvu3CJhV8bEOgSCm', '1943-06-15', 'H', "http://localhost:5000/images/johnny_validay1623314721119.jpg", 0, 0),
('Michel', 'Sordou', 'michelsordou@gmail.com', '$2b$10$UlygLu5Qmox07RGf4Yjqe.GAJ.SPHwB0fkiuRgvu3CJhV8bEOgSCm', '1947-01-26', 'H', "http://localhost:5000/images/michel_sordou1623314721119.png", 0, 0),
('Bernard', 'Tanpie', 'bernardtanpie@gmail.com', '$2b$10$UlygLu5Qmox07RGf4Yjqe.GAJ.SPHwB0fkiuRgvu3CJhV8bEOgSCm', '1943-01-26', 'H', "http://localhost:5000/images/bernard_tanpie1623314721119.jpg", 0, 0),
('Julien', 'Supers', 'juliensupers@gmail.com', '$2b$10$UlygLu5Qmox07RGf4Yjqe.GAJ.SPHwB0fkiuRgvu3CJhV8bEOgSCm', '1949-08-12', 'H', "http://localhost:5000/images/julien_supers1623314721119.jpg", 0, 0),
('Morgan', 'Fraisman', 'morganfraisman@gmail.com', '$2b$10$UlygLu5Qmox07RGf4Yjqe.GAJ.SPHwB0fkiuRgvu3CJhV8bEOgSCm', '1937-06-01', 'H', "http://localhost:5000/images/morgan_fraisman1623314721119.jpg", 0, 0);

INSERT INTO publications (text, autorId, imageUrl, usersLiked, likes, comments, date_insertion, date_modification) VALUES 
('Bonjour et bienvenue sur Groupomania NETWORK, je serai votre modérateur.', 1, '', '2,3,4,5', 4, 4, '2021-05-29 08:05:30', '2021-05-29 08:05:30'),
('Ouah trop cool ce nouveau réseau !', 2, '', '1,3,5', 3, 0, '2021-05-29 08:23:22', '2021-05-29 08:23:22'),
('Tempore quo primis auspiciis in mundanum fulgorem surgeret victura dum erunt homines Roma, ut augeretur sublimibus incrementis, foedere pacis aeternae Virtus convenit atque Fortuna plerumque dissidentes, quarum si altera defuisset, ad perfectam non venerat summitatem.', 3, '', '5,6', 2, 3, '2021-05-29 08:30:01', '2021-05-29 08:30:01'),
('Haec subinde Constantius audiens et quaedam referente Thalassio doctus, quem eum odisse iam conpererat lege communi, scribens ad Caesarem blandius adiumenta paulatim illi subtraxit, sollicitari se simulans ne, uti est militare otium fere tumultuosum, in eius perniciem conspiraret, solisque scholis iussit esse contentum palatinis et protectorum cum Scutariis et Gentilibus, et mandabat Domitiano, ex comite largitionum, praefecto ut cum in Syriam venerit, Gallum, quem crebro acciverat, ad Italiam properare blande hortaretur et verecunde.', 4, '', '4', 1, 1, '2021-05-29 08:32:01', '2021-05-29 08:32:01'),
('Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus. quod si impetrasset, fulminis modo cuncta vastarat. erat autem quod cogitabat huius modi.', 5, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Ideoque fertur neminem aliquando ob haec vel similia poenae addictum oblato de more elogio revocari iussisse, quod inexorabiles quoque principes factitarunt. et exitiale hoc vitium, quod in aliis non numquam intepescit, in illo aetatis progressu effervescebat, obstinatum eius propositum accendente adulatorum cohorte.', 6, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Eius populus ab incunabulis primis ad usque pueritiae tempus extremum, quod annis circumcluditur fere trecentis, circummurana pertulit bella, deinde aetatem ingressus adultam post multiplices bellorum aerumnas Alpes transcendit et fretum, in iuvenem erectus et virum ex omni plaga quam orbis ambit inmensus, reportavit laureas et triumphos, iamque vergens in senium et nomine solo aliquotiens vincens ad tranquilliora vitae discessit.', 7, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Altera sententia est, quae definit amicitiam paribus officiis ac voluntatibus. Hoc quidem est nimis exigue et exiliter ad calculos vocare amicitiam, ut par sit ratio acceptorum et datorum. Divitior mihi et affluentior videtur esse vera amicitia nec observare restricte, ne plus reddat quam acceperit; neque enim verendum est, ne quid excidat, aut ne quid in terram defluat, aut ne plus aequo quid in amicitiam congeratur.', 5, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Per hoc minui studium suum existimans Paulus, ut erat in conplicandis negotiis artifex dirus, unde ei Catenae inditum est cognomentum, vicarium ipsum eos quibus praeerat adhuc defensantem ad sortem periculorum communium traxit. et instabat ut eum quoque cum tribunis et aliis pluribus ad comitatum imperatoris vinctum perduceret: quo percitus ille exitio urgente abrupto ferro eundem adoritur Paulum. et quia languente dextera, letaliter ferire non potuit, iam districtum mucronem in proprium latus inpegit. hocque deformi genere mortis excessit e vita iustissimus rector ausus miserabiles casus levare multorum.', 2, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Equitis Romani autem esse filium criminis loco poni ab accusatoribus neque his iudicantibus oportuit neque defendentibus nobis. Nam quod de pietate dixistis, est quidem ista nostra existimatio, sed iudicium certe parentis; quid nos opinemur, audietis ex iuratis; quid parentes sentiant, lacrimae matris incredibilisque maeror, squalor patris et haec praesens maestitia, quam cernitis, luctusque declarat.', 1, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Et olim licet otiosae sint tribus pacataeque centuriae et nulla suffragiorum certamina set Pompiliani redierit securitas temporis, per omnes tamen quotquot sunt partes terrarum, ut domina suscipitur et regina et ubique patrum reverenda cum auctoritate canities populique Romani nomen circumspectum et verecundum.', 3, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Illud tamen clausos vehementer angebat quod captis navigiis, quae frumenta vehebant per flumen, Isauri quidem alimentorum copiis adfluebant, ipsi vero solitarum rerum cibos iam consumendo inediae propinquantis aerumnas exitialis horrebant.', 4, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Tempore quo primis auspiciis in mundanum fulgorem surgeret victura dum erunt homines Roma, ut augeretur sublimibus incrementis, foedere pacis aeternae Virtus convenit atque Fortuna plerumque dissidentes, quarum si altera defuisset, ad perfectam non venerat summitatem.', 6, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Hinc ille commotus ut iniusta perferens et indigna praefecti custodiam protectoribus mandaverat fidis. quo conperto Montius tunc quaestor acer quidem sed ad lenitatem propensior, consulens in commune advocatos palatinarum primos scholarum adlocutus est mollius docens nec decere haec fieri nec prodesse addensque vocis obiurgatorio sonu quod si id placeret, post statuas Constantii deiectas super adimenda vita praefecto conveniet securius cogitari.', 2, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Et licet quocumque oculos flexeris feminas adfatim multas spectare cirratas, quibus, si nupsissent, per aetatem ter iam nixus poterat suppetere liberorum, ad usque taedium pedibus pavimenta tergentes iactari volucriter gyris, dum exprimunt innumera simulacra, quae finxere fabulae theatrales.', 7, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Hanc regionem praestitutis celebritati diebus invadere parans dux ante edictus per solitudines Aboraeque amnis herbidas ripas, suorum indicio proditus, qui admissi flagitii metu exagitati ad praesidia descivere Romana. absque ullo egressus effectu deinde tabescebat immobilis.', 5, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Mox dicta finierat, multitudo omnis ad, quae imperator voluit, promptior laudato consilio consensit in pacem ea ratione maxime percita, quod norat expeditionibus crebris fortunam eius in malis tantum civilibus vigilasse, cum autem bella moverentur externa, accidisse plerumque luctuosa, icto post haec foedere gentium ritu perfectaque sollemnitate imperator Mediolanum ad hiberna discessit.', 1, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Ideoque fertur neminem aliquando ob haec vel similia poenae addictum oblato de more elogio revocari iussisse, quod inexorabiles quoque principes factitarunt. et exitiale hoc vitium, quod in aliis non numquam intepescit, in illo aetatis progressu effervescebat, obstinatum eius propositum accendente adulatorum cohorte.', 6, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Batnae municipium in Anthemusia conditum Macedonum manu priscorum ab Euphrate flumine brevi spatio disparatur, refertum mercatoribus opulentis, ubi annua sollemnitate prope Septembris initium mensis ad nundinas magna promiscuae fortunae convenit multitudo ad commercanda quae Indi mittunt et Seres aliaque plurima vehi terra marique consueta.', 2, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Accedat huc suavitas quaedam oportet sermonum atque morum, haudquaquam mediocre condimentum amicitiae. Tristitia autem et in omni re severitas habet illa quidem gravitatem, sed amicitia remissior esse debet et liberior et dulcior et ad omnem comitatem facilitatemque proclivior.', 4, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Quam ob rem ut ii qui superiores sunt submittere se debent in amicitia, sic quodam modo inferiores extollere. Sunt enim quidam qui molestas amicitias faciunt, cum ipsi se contemni putant; quod non fere contingit nisi iis qui etiam contemnendos se arbitrantur; qui hac opinione non modo verbis sed etiam opere levandi sunt.', 3, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Vide, quantum, inquam, fallare, Torquate. oratio me istius philosophi non offendit; nam et complectitur verbis, quod vult, et dicit plane, quod intellegam; et tamen ego a philosopho, si afferat eloquentiam, non asperner, si non habeat, non admodum flagitem. re mihi non aeque satisfacit, et quidem locis pluribus. sed quot homines, tot sententiae; falli igitur possumus.', 2, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Itaque tum Scaevola cum in eam ipsam mentionem incidisset, exposuit nobis sermonem Laeli de amicitia habitum ab illo secum et cum altero genero, C. Fannio Marci filio, paucis diebus post mortem Africani. Eius disputationis sententias memoriae mandavi, quas hoc libro exposui arbitratu meo; quasi enim ipsos induxi loquentes, ne inquam et inquit saepius interponeretur, atque ut tamquam a praesentibus coram haberi sermo videretur.', 5, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Postremo ad id indignitatis est ventum, ut cum peregrini ob formidatam haut ita dudum alimentorum inopiam pellerentur ab urbe praecipites, sectatoribus disciplinarum liberalium inpendio paucis sine respiratione ulla extrusis, tenerentur minimarum adseclae veri, quique id simularunt ad tempus, et tria milia saltatricum ne interpellata quidem cum choris totidemque remanerent magistris.', 7, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Quapropter a natura mihi videtur potius quam ab indigentia orta amicitia, applicatione magis animi cum quodam sensu amandi quam cogitatione quantum illa res utilitatis esset habitura. Quod quidem quale sit, etiam in bestiis quibusdam animadverti potest, quae ex se natos ita amant ad quoddam tempus et ab eis ita amantur ut facile earum sensus appareat. Quod in homine multo est evidentius, primum ex ea caritate quae est inter natos et parentes, quae dirimi nisi detestabili scelere non potest; deinde cum similis sensus exstitit amoris, si aliquem nacti sumus cuius cum moribus et natura congruamus, quod in eo quasi lumen aliquod probitatis et virtutis perspicere videamur.', 6, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Atque, ut Tullius ait, ut etiam ferae fame monitae plerumque ad eum locum ubi aliquando pastae sunt revertuntur, ita homines instar turbinis degressi montibus impeditis et arduis loca petivere mari confinia, per quae viis latebrosis sese convallibusque occultantes cum appeterent noctes luna etiam tum cornuta ideoque nondum solido splendore fulgente nauticos observabant quos cum in somnum sentirent effusos per ancoralia, quadrupedo gradu repentes seseque suspensis passibus iniectantes in scaphas eisdem sensim nihil opinantibus adsistebant et incendente aviditate saevitiam ne cedentium quidem ulli parcendo obtruncatis omnibus merces opimas velut viles nullis repugnantibus avertebant. haecque non diu sunt perpetrata.', 5, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Quare hoc quidem praeceptum, cuiuscumque est, ad tollendam amicitiam valet; illud potius praecipiendum fuit, ut eam diligentiam adhiberemus in amicitiis comparandis, ut ne quando amare inciperemus eum, quem aliquando odisse possemus. Quin etiam si minus felices in diligendo fuissemus, ferendum id Scipio potius quam inimicitiarum tempus cogitandum putabat.', 4, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Excogitatum est super his, ut homines quidam ignoti, vilitate ipsa parum cavendi ad colligendos rumores per Antiochiae latera cuncta destinarentur relaturi quae audirent. hi peragranter et dissimulanter honoratorum circulis adsistendo pervadendoque divites domus egentium habitu quicquid noscere poterant vel audire latenter intromissi per posticas in regiam nuntiabant, id observantes conspiratione concordi, ut fingerent quaedam et cognita duplicarent in peius, laudes vero supprimerent Caesaris, quas invitis conpluribus formido malorum inpendentium exprimebat.', 3, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Ego vero sic intellego, Patres conscripti, nos hoc tempore in provinciis decernendis perpetuae pacis habere oportere rationem. Nam quis hoc non sentit omnia alia esse nobis vacua ab omni periculo atque etiam suspicione belli?', 2, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Has autem provincias, quas Orontes ambiens amnis imosque pedes Cassii montis illius celsi praetermeans funditur in Parthenium mare, Gnaeus Pompeius superato Tigrane regnis Armeniorum abstractas dicioni Romanae coniunxit.', 1, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Mensarum enim voragines et varias voluptatum inlecebras, ne longius progrediar, praetermitto illuc transiturus quod quidam per ampla spatia urbis subversasque silices sine periculi metu properantes equos velut publicos signatis quod dicitur calceis agitant, familiarium agmina tamquam praedatorios globos post terga trahentes ne Sannione quidem, ut ait comicus, domi relicto. quos imitatae matronae complures opertis capitibus et basternis per latera civitatis cuncta discurrunt.', 4, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Sed tamen haec cum ita tutius observentur, quidam vigore artuum inminuto rogati ad nuptias ubi aurum dextris manibus cavatis offertur, inpigre vel usque Spoletium pergunt. haec nobilium sunt instituta.', 6, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Sin autem ad adulescentiam perduxissent, dirimi tamen interdum contentione vel uxoriae condicionis vel commodi alicuius, quod idem adipisci uterque non posset. Quod si qui longius in amicitia provecti essent, tamen saepe labefactari, si in honoris contentionem incidissent; pestem enim nullam maiorem esse amicitiis quam in plerisque pecuniae cupiditatem, in optimis quibusque honoris certamen et gloriae; ex quo inimicitias maximas saepe inter amicissimos exstitisse.', 7, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Sed maximum est in amicitia parem esse inferiori. Saepe enim excellentiae quaedam sunt, qualis erat Scipionis in nostro, ut ita dicam, grege. Numquam se ille Philo, numquam Rupilio, numquam Mummio anteposuit, numquam inferioris ordinis amicis, Q. vero Maximum fratrem, egregium virum omnino, sibi nequaquam parem, quod is anteibat aetate, tamquam superiorem colebat suosque omnes per se posse esse ampliores volebat.', 5, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00'),
('Verum ad istam omnem orationem brevis est defensio. Nam quoad aetas M. Caeli dare potuit isti suspicioni locum, fuit primum ipsius pudore, deinde etiam patris diligentia disciplinaque munita. Qui ut huic virilem togam deditšnihil dicam hoc loco de me; tantum sit, quantum vos existimatis; hoc dicam, hunc a patre continuo ad me esse deductum; nemo hunc M. Caelium in illo aetatis flore vidit nisi aut cum patre aut mecum aut in M. Crassi castissima domo, cum artibus honestissimis erudiretur.', 3, '', '', 0, 0, '2021-05-29 08:35:00', '2021-05-29 08:35:00');

INSERT INTO comments (text, autorId, pubOriginId, date_insertion, date_modification) VALUES 
('Altera sententia est, quae definit amicitiam paribus officiis ac voluntatibus. Hoc quidem est nimis exigue et exiliter ad calculos vocare amicitiam, ut par sit ratio acceptorum et datorum. Divitior mihi et affluentior videtur esse vera amicitia nec observare restricte, ne plus reddat quam acceperit; neque enim verendum est, ne quid excidat, aut ne quid in terram defluat, aut ne plus aequo quid in amicitiam congeratur.', 2, 1, '2021-05-29 08:10:30', '2021-05-29 08:10:30'),
('Quid enim tam absurdum quam delectari multis inanimis rebus, ut honore, ut gloria, ut aedificio, ut vestitu cultuque corporis, animante virtute praedito, eo qui vel amare vel, ut ita dicam, redamare possit, non admodum delectari?', 3, 1, '2021-05-29 08:11:30', '2021-05-29 08:11:30'),
('Nihil est enim remuneratione benevolentiae, nihil vicissitudine studiorum officiorumque iucundius.', 4, 1, '2021-05-29 08:12:30', '2021-05-29 08:12:30'),
('Hoc inmaturo interitu ipse quoque sui pertaesus excessit e vita aetatis nono anno atque vicensimo cum quadriennio imperasset.', 5, 1, '2021-05-29 08:13:30', '2021-05-29 08:13:30'),
('Tuscos in Massa Veternensi, patre Constantio Constantini fratre imperatoris, matreque Galla sorore Rufini et Cerealis, quos trabeae consulares nobilitarunt et praefecturae.', 2, 3, '2021-05-29 08:13:30', '2021-05-29 08:13:30'),
('Et olim licet otiosae sint tribus pacataeque centuriae et nulla suffragiorum certamina set Pompiliani redierit securitas temporis, per omnes tamen quotquot sunt partes terrarum.', 7, 3, '2021-05-29 08:13:30', '2021-05-29 08:13:30'),
('Ut domina suscipitur et regina et ubique patrum reverenda cum auctoritate canities populique Romani nomen circumspectum et verecundum.', 3, 3, '2021-05-29 08:13:30', '2021-05-29 08:13:30'),
('Mensarum enim voragines et varias voluptatum inlecebras, ne longius progrediar, praetermitto illuc transiturus quod quidam per ampla spatia urbis subversasque silices sine periculi metu properantes equos velut publicos signatis quod dicitur calceis agitant.', 1, 4, '2021-05-29 08:13:30', '2021-05-29 08:13:30');