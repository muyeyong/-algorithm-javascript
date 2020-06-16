enum MessageReferenceType {
  /// <summary>
  /// Reactive WO Message
  /// </summary>
  ReactiveWO = 0,

  /// <summary>
  /// Recurrent / SIM WO Message
  /// </summary>
  RecurrentWO = 1,

  /// <summary>
  /// SIM WO Message
  /// </summary>
  EventWO = 2,

  /// <summary>
  /// Call Center Message
  /// </summary>
  Call = 3,

  /// <summary>
  /// Project WO Message
  /// </summary>
  ProjectWO = 4,

  /// <summary>
  /// Location Notes/Comments
  /// </summary>
  LocationNotes = 5,

  /// <summary>
  /// Location Landlord Comments
  /// </summary>
  LocationLandlordComment = 6,

  /// <summary>
  /// Location Responsible Entity Comments
  /// </summary>
  LocationResponsibleEntityComment = 7,

  /// <summary>
  /// Location Alert Comment
  /// </summary>
  LocationAlertComment = 8,

  /// <summary>
  /// Lead/Affiliate management Comment
  /// </summary>
  AffiliteNotes = 9,

  /// <summary>
  /// Project
  /// </summary>
  Project = 16,

  ReactiveWOArchieve = 17,
  /// <summary>
  /// Inspection
  /// </summary>
  Inspection = 21,

  /// <summary>
  /// ProCare
  /// </summary>
  ProCare = 23,

  TurnRehabCaptial = 26

}

for (let v in MessageReferenceType) { 
  console.log(v)
}